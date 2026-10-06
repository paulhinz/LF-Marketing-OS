#!/usr/bin/env python3
"""
build_deck.py — Build a Member Pitch Deck in the LF "membership overview" style
(v2, modeled on the x402 Pitch Deck v1 rebuilt by Member Growth, Oct 2026).

Every deck produced by the lf-member-pitch-deck skill goes through this script.
It builds a 16:9 deck from scratch with python-pptx using the project's Brand
Kit tokens (accent color, display + body font, logos) on a white canvas, with
the Linux Foundation co-brand lockup on the title and closing slides. The
visual system is fixed by this script; the spec supplies only content and the
Brand Kit tokens — never per-slide fonts, sizes or colors.

Usage:
    python3 build_deck.py spec.json "Project Member Pitch Deck.pptx"

Spec format (JSON):
{
  "project": {
    "name": "x402 Foundation",            # full name used in titles
    "short": "x402",                      # short name for the footer / lockup
    "logo": "assets/x402-logo.png",       # dark-on-light wordmark (content slides, lockup)
    "logo_dark": "assets/x402-white.png", # optional light-on-dark wordmark (ask slide)
    "mark": "assets/x402-mark.png"        # optional symbol for the title slide hero
  },
  "theme": {                              # Brand Kit tokens; every key is optional
    "accent": "#0F6E3D",                  # one accent (labels, numbers, highlight card)
    "display_font": "Instrument Serif",   # titles, statements, big numbers
    "body_font": "Inter",                 # everything else
    "text": "#1A1A1A", "muted": "#5F6368", "card": "#F3F3F3",
    "dark": "#1E1E1E", "rule": "#E3E3E3"
  },
  "slides": [ { "layout": "...", "title": "...", "notes": "...", ... }, ... ]
}

Inline **bold** is supported in every text field. Every slide may carry
"notes" (the prep brief). Layout keys and their fields:

  title       title, subtitle, date, [image]          white; LF | project lockup bottom-right
  agenda      title, items[]                           numbered list
  statement   text, [sub]                              one big centered statement (LF goal slide)
  image_full  title, image                             full-width picture (LF project mosaic)
  cards       title, cards[{heading,text}], [cols 2|3], [highlight i], [callout {heading,text}]
  two_col     title, left{heading,bullets[]}, right{heading,bullets[]}
  vision      vision, mission, [strategy_label], strategy[]
  rows        title, rows[{label,text}], [footnote]    label left, description right
  steps       title, steps[{heading,text}], [highlight_last true]   numbered flow with arrows
  stats       title, stats[{value,label}]              big-number tiles (3 per row)
  logo_wall   title, groups[{heading, images[]}]       member logos by tier
  person      title, image, heading, text              leadership / welcome slide
  tiers       title, tiers[{name,price,bullets[],highlight}], [strip {heading, steps[{heading,text}]}]
  table       title, columns[], rows[[...]]            ROI by role, fee bands, benefit matrix
  timeline    title, steps[{when,heading,text}]        first-90-days
  bullets     title, bullets[], [lead]                 generic fallback / appendix
  section     title, [subtitle]                        divider (counts toward the cap)
  ask         text, [link_text, link_url], contact     dark slide
  thanks      [text]                                   closing, LF | project lockup

Hard limits: 22 slides maximum. The script prints an overflow estimate for
every text block; treat a "LONG" warning as a cut-words instruction.
"""
import json
import re
import sys
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches, Pt

HERE = Path(__file__).resolve().parent
ASSETS = HERE.parent / "assets"
LF_LOGO = ASSETS / "lf-logo-color.png"
LF_LOGO_WHITE = ASSETS / "lf-logo-white.png"

MAX_SLIDES = 22
SLIDE_W, SLIDE_H = Inches(10), Inches(5.625)
MARGIN = Inches(0.45)
CONTENT_W = SLIDE_W - 2 * MARGIN

DEFAULT_THEME = {
    "accent": "#0F6E3D",
    "display_font": "Instrument Serif",
    "body_font": "Inter",
    "text": "#1A1A1A",
    "muted": "#5F6368",
    "card": "#F3F3F3",
    "dark": "#1E1E1E",
    "rule": "#E3E3E3",
    "white": "#FFFFFF",
}

WARNINGS = []


# ----------------------------------------------------------------------------
# helpers
# ----------------------------------------------------------------------------
def rgb(hexstr):
    h = hexstr.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def parse_bold(text):
    """Split 'a **b** c' into [(a,False),(b,True),(c,False)]."""
    parts = re.split(r"(\*\*.+?\*\*)", str(text))
    out = []
    for p in parts:
        if not p:
            continue
        if p.startswith("**") and p.endswith("**"):
            out.append((p[2:-2], True))
        else:
            out.append((p, False))
    return out


class Deck:
    def __init__(self, spec):
        self.spec = spec
        self.theme = {**DEFAULT_THEME, **spec.get("theme", {})}
        self.project = spec.get("project", {})
        self.prs = Presentation()
        self.prs.slide_width, self.prs.slide_height = SLIDE_W, SLIDE_H
        self.blank = self.prs.slide_layouts[6]
        self.n = 0

    # -- primitives ---------------------------------------------------------
    def color(self, key):
        return rgb(self.theme[key]) if key in self.theme else rgb(key)

    def new_slide(self, bg=None):
        s = self.prs.slides.add_slide(self.blank)
        self.n += 1
        if bg:
            fill = s.background.fill
            fill.solid()
            fill.fore_color.rgb = self.color(bg)
        return s

    def text(self, slide, x, y, w, h, content, size=14, font="body", color="text",
             bold=False, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, line_spacing=1.15,
             paragraphs=None, bullets=False, space_after=4):
        """Add a textbox. `content` is a string or list of strings (paragraphs)."""
        tb = slide.shapes.add_textbox(x, y, w, h)
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.05)
        tf.margin_top = tf.margin_bottom = Inches(0.03)
        tf.vertical_anchor = anchor
        paras = paragraphs if paragraphs is not None else (content if isinstance(content, list) else [content])
        fontname = self.theme["display_font"] if font == "display" else self.theme["body_font"]
        total_chars = 0
        for i, para in enumerate(paras):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.alignment = align
            p.line_spacing = line_spacing
            p.space_after = Pt(space_after)
            ptext = para
            psize, pcolor, pbold, pfont = size, color, bold, fontname
            if isinstance(para, dict):  # per-paragraph override
                ptext = para["text"]
                psize = para.get("size", size)
                pcolor = para.get("color", color)
                pbold = para.get("bold", bold)
                pfont = self.theme["display_font"] if para.get("font") == "display" else pfont
            prefix = "•  " if bullets else ""
            runs = parse_bold(ptext)
            if prefix:
                runs = [(prefix, False)] + runs
            for rtext, rbold in runs:
                r = p.add_run()
                r.text = rtext
                r.font.name = pfont
                r.font.size = Pt(psize)
                r.font.bold = pbold or rbold
                r.font.color.rgb = self.color(pcolor)
                total_chars += len(rtext)
        self._check_fit(w, h, size, total_chars, len(paras), line_spacing, str(paras[0])[:40])
        return tb

    def _check_fit(self, w, h, size, chars, nparas, ls, label):
        """Crude overflow estimate: average glyph ≈ 0.5em wide, line ≈ 1.2em·ls tall."""
        w_pt, h_pt = Emu(w).pt, Emu(h).pt
        cpl = max(1, int(w_pt / (size * 0.5)))
        lines = sum(1 for _ in range(nparas)) + chars // cpl
        need = lines * size * 1.2 * ls
        if need > h_pt * 1.05:
            WARNINGS.append(f"slide {self.n}: LONG text block ({int(need)}pt needed, {int(h_pt)}pt available): {label!r}")

    def rect(self, slide, x, y, w, h, fill="card", line=None, radius=True, dash=False):
        shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE, x, y, w, h)
        if radius:
            shp.adjustments[0] = 0.06
        shp.fill.solid()
        shp.fill.fore_color.rgb = self.color(fill)
        if line:
            shp.line.color.rgb = self.color(line)
            shp.line.width = Pt(1)
            if dash:
                from pptx.enum.dml import MSO_LINE
                shp.line.dash_style = MSO_LINE.DASH
        else:
            shp.line.fill.background()
        shp.shadow.inherit = False
        shp.text_frame.text = ""
        return shp

    def hline(self, slide, x, y, w, color="rule"):
        ln = slide.shapes.add_connector(1, x, y, x + w, y)
        ln.line.color.rgb = self.color(color)
        ln.line.width = Pt(0.75)
        return ln

    def picture(self, slide, path, x, y, w=None, h=None, fit=True):
        p = Path(path)
        if not p.exists():
            WARNINGS.append(f"slide {self.n}: image not found: {path}")
            return None
        if fit and w and h:
            from PIL import Image
            with Image.open(p) as im:
                iw, ih = im.size
            scale = min(w / iw, h / ih)
            pw, ph = int(iw * scale), int(ih * scale)
            return slide.shapes.add_picture(str(p), x + (w - pw) // 2, y + (h - ph) // 2, pw, ph)
        return slide.shapes.add_picture(str(p), x, y, w, h)

    # -- chrome -------------------------------------------------------------
    def title(self, slide, text, size=26, color="text"):
        self.text(slide, MARGIN, Inches(0.32), CONTENT_W, Inches(0.9), text, size=size, font="display", color=color,
                  anchor=MSO_ANCHOR.TOP, line_spacing=1.05)
        return self.content_top(text, size)

    @staticmethod
    def content_top(text, size=26):
        """Where content may start under a title: one line ≈ 0.9in, two lines ≈ 1.45in."""
        cpl = int(Emu(CONTENT_W).pt / (size * 0.52))
        lines = 1 + len(str(text)) // cpl
        return Inches(1.2) if lines <= 1 else Inches(1.45)

    def footer(self, slide, dark=False):
        """Project wordmark bottom-left + slide number bottom-right (content slides)."""
        logo = self.project.get("logo_dark" if dark else "logo") or self.project.get("logo")
        if logo:
            self.picture(slide, logo, MARGIN, SLIDE_H - Inches(0.55), Inches(1.1), Inches(0.32))
        self.text(slide, SLIDE_W - Inches(0.9), SLIDE_H - Inches(0.45), Inches(0.5), Inches(0.25), str(self.n),
                  size=8, color="white" if dark else "muted", align=PP_ALIGN.RIGHT)

    def lockup(self, slide, dark=False):
        """'The Linux Foundation | project' co-brand lockup, bottom-right."""
        y = SLIDE_H - Inches(0.72)
        lf = LF_LOGO_WHITE if dark else LF_LOGO
        self.picture(slide, lf, SLIDE_W - Inches(2.75), y, Inches(1.25), Inches(0.42))
        self.hline(slide, SLIDE_W - Inches(1.4), y + Inches(0.04), 0)  # spacer
        sep = slide.shapes.add_connector(1, SLIDE_W - Inches(1.38), y + Inches(0.02), SLIDE_W - Inches(1.38), y + Inches(0.4))
        sep.line.color.rgb = self.color("muted")
        sep.line.width = Pt(0.75)
        logo = self.project.get("logo_dark" if dark else "logo") or self.project.get("logo")
        if logo:
            self.picture(slide, logo, SLIDE_W - Inches(1.3), y, Inches(0.95), Inches(0.42))
        else:
            self.text(slide, SLIDE_W - Inches(1.3), y, Inches(0.95), Inches(0.42), self.project.get("short", ""),
                      size=12, bold=True, color="white" if dark else "text", anchor=MSO_ANCHOR.MIDDLE)

    def card(self, slide, x, y, w, h, heading, body, highlight=False, heading_size=12, body_size=10,
             heading_color="accent", eyebrow=None, pad=Inches(0.18)):
        fill = "accent" if highlight else "card"
        self.rect(slide, x, y, w, h, fill=fill)
        tc = "white" if highlight else "text"
        hc = "white" if highlight else heading_color
        cy = y + pad
        if eyebrow:
            self.text(slide, x + pad, cy, w - 2 * pad, Inches(0.22), eyebrow.upper(), size=7.5, bold=True, color=hc)
            cy += Inches(0.22)
        self.text(slide, x + pad, cy, w - 2 * pad, Inches(0.32), heading, size=heading_size, bold=True, color=hc)
        self.text(slide, x + pad, cy + Inches(0.36), w - 2 * pad, h - (cy - y) - Inches(0.36) - pad, body,
                  size=body_size, color="white" if highlight else "muted", line_spacing=1.2)

    # -- layouts --------------------------------------------------------------
    def l_title(self, s):
        slide = self.new_slide()
        # soft hero panel on the right
        self.rect(slide, Inches(6.3), Inches(1.1), Inches(3.0), Inches(3.4), fill="card", radius=False)
        if s.get("image") or self.project.get("mark"):
            self.picture(slide, s.get("image") or self.project.get("mark"), Inches(6.9), Inches(1.7), Inches(1.8), Inches(2.2))
        self.text(slide, MARGIN, Inches(1.7), Inches(5.7), Inches(0.9), s.get("title", self.project.get("name", "")),
                  size=40, font="display", anchor=MSO_ANCHOR.BOTTOM)
        self.text(slide, MARGIN, Inches(2.65), Inches(5.7), Inches(0.75), s.get("subtitle", ""), size=18, color="muted",
                  line_spacing=1.1)
        if s.get("date"):
            self.text(slide, MARGIN, Inches(3.45), Inches(5.7), Inches(0.4), s["date"], size=16, color="muted")
        self.lockup(slide)
        return slide

    def l_agenda(self, s):
        slide = self.new_slide()
        self.title(slide, s.get("title", "Agenda"))
        items = s.get("items", [])
        y = Inches(1.45)
        for i, it in enumerate(items, 1):
            self.text(slide, MARGIN, y, Inches(0.5), Inches(0.5), str(i), size=22, font="display", color="accent")
            self.text(slide, MARGIN + Inches(0.55), y + Inches(0.06), Inches(7.5), Inches(0.45), it, size=16)
            y += Inches(0.6)
        self.footer(slide)
        return slide

    def l_statement(self, s):
        slide = self.new_slide()
        paras = [{"text": s["text"], "size": 24, "font": "display"}]
        if s.get("sub"):
            paras.append({"text": s["sub"], "size": 18, "font": "display", "color": "text"})
        self.text(slide, Inches(0.8), Inches(0.8), SLIDE_W - Inches(1.6), Inches(3.6), None, paragraphs=paras,
                  size=24, font="display", align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.15,
                  space_after=18)
        self.lockup(slide)
        return slide

    def l_image_full(self, s):
        slide = self.new_slide()
        top = self.title(slide, s.get("title", ""), size=22)
        self.picture(slide, s["image"], MARGIN, top, CONTENT_W, SLIDE_H - top - Inches(0.7))
        self.footer(slide)
        return slide

    def l_cards(self, s):
        slide = self.new_slide()
        top = self.title(slide, s.get("title", ""), size=24)
        cards = s.get("cards", [])
        cols = s.get("cols") or (3 if len(cards) in (3, 6) else 2)
        rows = -(-len(cards) // cols)
        callout = s.get("callout")
        avail_h = SLIDE_H - top - Inches(0.7) - (Inches(0.9) if callout else 0)
        gap = Inches(0.2)
        cw = (CONTENT_W - gap * (cols - 1)) / cols
        ch = (avail_h - gap * (rows - 1)) / rows
        hl = s.get("highlight")
        for i, c in enumerate(cards):
            r, col = divmod(i, cols)
            x = MARGIN + col * (cw + gap)
            y = top + r * (ch + gap)
            dense = rows > 2 or callout is not None
            self.card(slide, x, y, cw, ch, c.get("heading", ""), c.get("text", ""), highlight=(hl == i),
                      eyebrow=c.get("eyebrow"), heading_size=11 if dense else 12, body_size=8.5 if dense else 10,
                      pad=Inches(0.14) if dense else Inches(0.18))
        if callout:
            y = top + rows * (ch + gap)
            self.rect(slide, MARGIN, y, CONTENT_W, Inches(0.78), fill="white", line="accent", dash=True)
            self.text(slide, MARGIN + Inches(0.18), y + Inches(0.07), CONTENT_W - Inches(0.36), Inches(0.26),
                      callout.get("heading", ""), size=10.5, bold=True, color="accent")
            self.text(slide, MARGIN + Inches(0.18), y + Inches(0.33), CONTENT_W - Inches(0.36), Inches(0.44),
                      callout.get("text", ""), size=9, color="text", line_spacing=1.15)
        self.footer(slide)
        return slide

    def l_two_col(self, s):
        slide = self.new_slide()
        top = self.title(slide, s.get("title", ""))
        colw = (CONTENT_W - Inches(0.5)) / 2
        for i, key in enumerate(("left", "right")):
            col = s.get(key, {})
            x = MARGIN + i * (colw + Inches(0.5))
            self.text(slide, x, top, colw, Inches(0.4), col.get("heading", ""), size=14, bold=True)
            self.text(slide, x, top + Inches(0.45), colw, SLIDE_H - top - Inches(1.2), col.get("bullets", []), size=12,
                      bullets=True, line_spacing=1.2, space_after=8)
        self.footer(slide)
        return slide

    def l_vision(self, s):
        slide = self.new_slide()
        top = self.content_top("Vision: " + s.get("vision", ""), 22)
        self.text(slide, MARGIN, Inches(0.35), CONTENT_W, top - Inches(0.4), "**Vision:** " + s.get("vision", ""),
                  size=22, font="display", line_spacing=1.1)
        self.text(slide, MARGIN, top, CONTENT_W, Inches(0.9), "**Mission:** " + s.get("mission", ""),
                  size=14, font="display", color="text", line_spacing=1.2)
        self.text(slide, MARGIN, top + Inches(1.0), CONTENT_W, Inches(0.35), s.get("strategy_label", "Strategy:"),
                  size=12, color="muted")
        self.text(slide, MARGIN, top + Inches(1.4), CONTENT_W, SLIDE_H - top - Inches(2.1), s.get("strategy", []),
                  size=12, bullets=True, color="text", line_spacing=1.2, space_after=10)
        self.footer(slide)
        return slide

    def l_rows(self, s):
        slide = self.new_slide()
        y = self.title(slide, s.get("title", ""), size=22)
        rows = s.get("rows", [])
        avail = SLIDE_H - y - Inches(0.75) - (Inches(0.6) if s.get("footnote") else 0)
        rh = min(Inches(0.85), avail / max(1, len(rows)))
        for r in rows:
            self.text(slide, MARGIN, y, Inches(2.7), rh, r.get("label", ""), size=11.5, bold=True)
            self.text(slide, MARGIN + Inches(2.9), y, CONTENT_W - Inches(2.9), rh, r.get("text", ""), size=10.5,
                      color="muted", line_spacing=1.2)
            y += rh
        if s.get("footnote"):
            self.text(slide, MARGIN + Inches(2.9), y, CONTENT_W - Inches(2.9), Inches(0.6), s["footnote"], size=10,
                      color="muted", line_spacing=1.2)
        self.footer(slide)
        return slide

    def l_steps(self, s):
        slide = self.new_slide()
        top = self.title(slide, s.get("title", ""), size=22) + Inches(0.1)
        steps = s.get("steps", [])
        n = max(1, len(steps))
        gap = Inches(0.28)
        cw = (CONTENT_W - gap * (n - 1)) / n
        ch = SLIDE_H - top - Inches(0.85)
        for i, st in enumerate(steps):
            x = MARGIN + i * (cw + gap)
            hl = s.get("highlight_last", True) and i == n - 1
            self.rect(slide, x, top, cw, ch, fill="accent" if hl else "white", line=None if hl else "rule")
            tc = "white" if hl else "text"
            self.text(slide, x + Inches(0.15), top + Inches(0.15), Inches(0.6), Inches(0.5), str(i + 1), size=22,
                      font="display", color="white" if hl else "accent")
            self.text(slide, x + Inches(0.15), top + Inches(0.75), cw - Inches(0.3), Inches(0.4), st.get("heading", ""),
                      size=11, bold=True, color=tc)
            self.text(slide, x + Inches(0.15), top + Inches(1.25), cw - Inches(0.3), ch - Inches(1.4), st.get("text", ""),
                      size=9.5, color="white" if hl else "muted", line_spacing=1.2)
            if i < n - 1:
                self.text(slide, x + cw - Inches(0.02), top + ch / 2 - Inches(0.2), gap + Inches(0.04), Inches(0.4), "→",
                          size=14, color="rule", align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        self.footer(slide)
        return slide

    def l_stats(self, s):
        slide = self.new_slide(bg="card")
        top = self.title(slide, s.get("title", ""), size=22) + Inches(0.1)
        stats = s.get("stats", [])
        cols = 3 if len(stats) > 4 else min(len(stats), 4) or 1
        rows = -(-len(stats) // cols)
        gap = Inches(0.2)
        cw = (CONTENT_W - gap * (cols - 1)) / cols
        ch = min(Inches(1.55), (SLIDE_H - top - Inches(0.8) - gap * (rows - 1)) / rows)
        for i, st in enumerate(stats):
            r, c = divmod(i, cols)
            x, y = MARGIN + c * (cw + gap), top + r * (ch + gap)
            self.rect(slide, x, y, cw, ch, fill="white", line="rule")
            self.text(slide, x + Inches(0.2), y + Inches(0.18), cw - Inches(0.4), Inches(0.7), st.get("value", ""),
                      size=30, font="display")
            self.text(slide, x + Inches(0.2), y + ch - Inches(0.55), cw - Inches(0.4), Inches(0.4), st.get("label", ""),
                      size=9.5, color="muted")
        self.footer(slide)
        return slide

    def l_logo_wall(self, s):
        slide = self.new_slide()
        groups = s.get("groups", [])
        if s.get("title"):
            self.title(slide, s["title"], size=22)
            top = Inches(1.2)
        else:
            top = Inches(0.4)
        total = sum(max(1, len(g.get("images", []))) for g in groups) or 1
        x = MARGIN
        gapx = Inches(0.35)
        availw = CONTENT_W - gapx * (len(groups) - 1)
        for g in groups:
            imgs = g.get("images", [])
            share = max(1, len(imgs)) / total
            gw = availw * share
            self.text(slide, x, top, gw, Inches(0.35), g.get("heading", ""), size=14, font="display")
            tile_gap = Inches(0.1)
            avail_h = SLIDE_H - Inches(0.65) - (top + Inches(0.45))
            cols = g.get("cols")
            if not cols:  # smallest column count whose rows fit the available height
                cols = max(1, min(3, len(imgs)))
                while cols < 8:
                    tw = (gw - tile_gap * (cols - 1)) / cols
                    th = min(Inches(0.62), tw * 0.55)
                    rows = -(-len(imgs) // cols)
                    if rows * (th + tile_gap) <= avail_h:
                        break
                    cols += 1
            tw = (gw - tile_gap * (cols - 1)) / cols
            th = min(Inches(0.62), tw * 0.55)
            for i, img in enumerate(imgs):
                r, c = divmod(i, cols)
                tx, ty = x + c * (tw + tile_gap), top + Inches(0.45) + r * (th + tile_gap)
                if ty + th > SLIDE_H - Inches(0.6):
                    WARNINGS.append(f"slide {self.n}: logo wall overflows ({len(imgs)} logos in {cols} cols) — split the group")
                    break
                self.rect(slide, tx, ty, tw, th, fill="white", line="rule")
                self.picture(slide, img, tx + Inches(0.08), ty + Inches(0.08), tw - Inches(0.16), th - Inches(0.16))
            x += gw + gapx
        self.footer(slide)
        return slide

    def l_person(self, s):
        slide = self.new_slide()
        self.rect(slide, Inches(5.0), 0, Inches(5.0), SLIDE_H, fill="card", radius=False)
        self.text(slide, MARGIN, Inches(0.7), Inches(4.2), Inches(1.3), s.get("title", "Welcome"), size=30, font="display",
                  align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        if s.get("image"):
            pic = self.picture(slide, s["image"], Inches(1.2), Inches(2.1), Inches(2.9), Inches(2.9))
            if pic is not None:
                pic.crop_left = pic.crop_right = pic.crop_top = pic.crop_bottom = 0
                from pptx.oxml.ns import qn
                # round the portrait
                sppr = pic._element.spPr
                prst = sppr.find(qn("a:prstGeom"))
                if prst is not None:
                    prst.set("prst", "ellipse")
        self.text(slide, Inches(5.5), Inches(1.9), Inches(4.0), Inches(0.6), s.get("heading", ""), size=13, bold=True)
        self.text(slide, Inches(5.5), Inches(2.5), Inches(4.0), Inches(2.2), s.get("text", ""), size=12, color="muted",
                  line_spacing=1.25)
        # lockup top-right of the panel
        self.picture(slide, LF_LOGO, Inches(8.4), Inches(0.3), Inches(1.2), Inches(0.4))
        if self.project.get("logo"):
            self.picture(slide, self.project["logo"], Inches(8.6), Inches(0.75), Inches(1.0), Inches(0.35))
        return slide

    def l_tiers(self, s):
        slide = self.new_slide()
        top = self.title(slide, s.get("title", ""), size=22)
        tiers = s.get("tiers", [])
        strip = s.get("strip")
        n = max(1, len(tiers))
        gap = Inches(0.22)
        cw = (CONTENT_W - gap * (n - 1)) / n
        ch = (Inches(2.35) if strip else Inches(3.6)) - (top - Inches(1.2))
        for i, t in enumerate(tiers):
            x = MARGIN + i * (cw + gap)
            hl = t.get("highlight", i == 0)
            self.rect(slide, x, top, cw, ch, fill="dark" if hl else "white", line=None if hl else "rule")
            tc = "white" if hl else "text"
            self.text(slide, x + Inches(0.18), top + Inches(0.14), cw - Inches(0.36), Inches(0.3), t.get("name", ""),
                      size=13, bold=True, color=tc)
            self.text(slide, x + Inches(0.18), top + Inches(0.42), cw - Inches(0.36), Inches(0.45), t.get("price", ""),
                      size=20, font="display", color="white" if hl else "accent")
            self.text(slide, x + Inches(0.18), top + Inches(0.9), cw - Inches(0.36), ch - Inches(0.98),
                      t.get("bullets", []), size=9, bullets=True, color="white" if hl else "text", line_spacing=1.1,
                      space_after=2)
        if strip:
            y = top + ch + Inches(0.15)
            self.text(slide, MARGIN, y, CONTENT_W, Inches(0.22), strip.get("heading", "").upper(), size=8, bold=True,
                      color="accent")
            steps = strip.get("steps", [])
            m = max(1, len(steps))
            sg = Inches(0.3)
            sw = (CONTENT_W - sg * (m - 1)) / m
            sy = y + Inches(0.26)
            for i, st in enumerate(steps):
                sx = MARGIN + i * (sw + sg)
                self.text(slide, sx, sy, sw, Inches(0.4), st.get("heading", ""), size=9, bold=True, line_spacing=1.05)
                self.text(slide, sx, sy + Inches(0.4), sw, SLIDE_H - sy - Inches(1.0), st.get("text", ""), size=8,
                          color="muted", line_spacing=1.1)
                if i < m - 1:
                    self.text(slide, sx + sw, sy, sg, Inches(0.3), "→", size=10, color="accent", align=PP_ALIGN.CENTER)
        self.footer(slide)
        return slide

    def l_table(self, s):
        slide = self.new_slide()
        top = self.title(slide, s.get("title", ""), size=22)
        cols = s.get("columns", [])
        rows = s.get("rows", [])
        widths = s.get("widths")  # optional relative widths
        ncol = len(cols)
        if not widths:
            widths = [1] * ncol
        tot = sum(widths)
        xs, x = [], MARGIN
        for wgt in widths:
            xs.append(x)
            x += CONTENT_W * wgt / tot
        y = top
        for i, c in enumerate(cols):
            w = CONTENT_W * widths[i] / tot
            self.text(slide, xs[i], y, w, Inches(0.3), c, size=8.5, color="muted")
        y += Inches(0.3)
        self.hline(slide, MARGIN, y, CONTENT_W)
        avail = SLIDE_H - y - Inches(0.75)
        rh = min(Inches(0.8), avail / max(1, len(rows)))
        for r in rows:
            for i, cell in enumerate(r):
                w = CONTENT_W * widths[i] / tot
                self.text(slide, xs[i], y + Inches(0.08), w - Inches(0.1), rh - Inches(0.1), cell, size=9.5,
                          bold=(i == 0), color="text" if i != 1 or ncol < 3 else "muted", line_spacing=1.15)
            y += rh
        self.footer(slide)
        return slide

    def l_timeline(self, s):
        slide = self.new_slide()
        y = self.title(slide, s.get("title", ""), size=22) + Inches(0.1)
        steps = s.get("steps", [])
        rh = min(Inches(0.85), (SLIDE_H - y - Inches(0.75)) / max(1, len(steps)))
        for st in steps:
            self.text(slide, MARGIN, y, Inches(1.3), rh, st.get("when", ""), size=12, font="display", color="accent")
            self.text(slide, MARGIN + Inches(1.35), y, Inches(1.5), rh, st.get("heading", ""), size=11, bold=True)
            self.text(slide, MARGIN + Inches(2.95), y, CONTENT_W - Inches(2.95), rh, st.get("text", ""), size=10,
                      color="muted", line_spacing=1.2)
            y += rh
        self.footer(slide)
        return slide

    def l_bullets(self, s):
        slide = self.new_slide()
        y = self.title(slide, s.get("title", ""), size=22)
        if s.get("lead"):
            self.text(slide, MARGIN, y, CONTENT_W, Inches(0.6), s["lead"], size=12, color="muted", line_spacing=1.2)
            y += Inches(0.65)
        self.text(slide, MARGIN, y, CONTENT_W, SLIDE_H - y - Inches(0.75), s.get("bullets", []), size=12, bullets=True,
                  line_spacing=1.2, space_after=8)
        self.footer(slide)
        return slide

    def l_section(self, s):
        slide = self.new_slide()
        self.text(slide, MARGIN, Inches(1.8), CONTENT_W, Inches(1.2), s.get("title", ""), size=36, font="display",
                  anchor=MSO_ANCHOR.MIDDLE)
        if s.get("subtitle"):
            self.text(slide, MARGIN, Inches(3.0), CONTENT_W, Inches(0.6), s["subtitle"], size=16, color="muted")
        self.footer(slide)
        return slide

    def l_ask(self, s):
        slide = self.new_slide(bg="dark")
        text = s.get("text", "")
        link_text, link_url = s.get("link_text"), s.get("link_url")
        if link_url and link_text and link_text in text:
            pre, post = text.split(link_text, 1)
            text = f"{pre}**{link_text}**{post}"  # bold marks the run to hyperlink
        tb = self.text(slide, Inches(0.9), Inches(1.3), SLIDE_W - Inches(1.8), Inches(1.6), text, size=24,
                       font="display", color="white", align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        if link_url:
            for p in tb.text_frame.paragraphs:
                for r in p.runs:
                    if (link_text and r.text == link_text) or not link_text:
                        r.hyperlink.address = link_url
                        r.font.bold = False
                        r.font.underline = True
                        r.font.color.rgb = self.color("white")
                        break
        if s.get("contact"):
            self.text(slide, Inches(0.9), Inches(3.1), SLIDE_W - Inches(1.8), Inches(0.5), s["contact"], size=14,
                      color="white", align=PP_ALIGN.CENTER)
        logo = self.project.get("logo_dark")
        if logo:
            self.picture(slide, logo, Inches(6.4), Inches(3.6), Inches(3.2), Inches(1.6))
        return slide

    def l_thanks(self, s):
        slide = self.new_slide()
        self.rect(slide, Inches(6.3), Inches(1.1), Inches(3.0), Inches(3.4), fill="card", radius=False)
        self.text(slide, Inches(0.8), Inches(1.6), SLIDE_W - Inches(1.6), Inches(1.6), s.get("text", "Thank you!"),
                  size=40, font="display", align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        self.lockup(slide)
        return slide

    # -- driver ---------------------------------------------------------------
    LAYOUTS = {
        "title": l_title, "agenda": l_agenda, "statement": l_statement, "image_full": l_image_full,
        "cards": l_cards, "two_col": l_two_col, "vision": l_vision, "rows": l_rows, "steps": l_steps,
        "stats": l_stats, "logo_wall": l_logo_wall, "person": l_person, "tiers": l_tiers, "table": l_table,
        "timeline": l_timeline, "bullets": l_bullets, "section": l_section, "ask": l_ask, "thanks": l_thanks,
    }

    def build(self, out_path):
        slides = self.spec.get("slides", [])
        if len(slides) > MAX_SLIDES:
            raise SystemExit(f"Deck has {len(slides)} slides; the limit is {MAX_SLIDES}.")
        for i, s in enumerate(slides, 1):
            key = s.get("layout", "bullets")
            fn = self.LAYOUTS.get(key)
            if fn is None:
                raise SystemExit(f"Slide {i}: unknown layout key {key!r}. Valid: {sorted(self.LAYOUTS)}")
            slide = fn(self, s)
            if s.get("notes"):
                slide.notes_slide.notes_text_frame.text = s["notes"]
        self.prs.save(out_path)
        print(f"Wrote {out_path} — {len(slides)} slides ({self.project.get('name', '')})")
        for w in WARNINGS:
            print("  !", w)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    spec = json.loads(Path(sys.argv[1]).read_text())
    Deck(spec).build(sys.argv[2])
