x402 Foundation example in the image-led form of the published LF brand pages. Logo rules from x402.org/brand-guidelines (read 8 Oct 2026); colors and fonts from the brand page and the site CSS; verbal content from the Messaging Document example. `logos/` holds the wordmark rendered from the site's SVG plus a cropped symbol for testing only; x402 is a trademark of LF Projects, LLC.

Build from inside this folder:
  for c in backgrounds scaling clearspace lockup watchouts; do python3 ../scripts/brand_graphics.py $c x402-brand.json gfx-$c.png; done
  python3 ../scripts/brand_graphics.py symbol x402-brand.json gfx-symbol.png --symbol logos/x402-symbol.png
  python3 ../scripts/make_palette_png.py x402-brand.json palette.png --names "Signal Green (UI),Ink,Slate,Ink,Mist"
  python3 ../scripts/build_deck.py x402-deck.json "x402 Foundation Brand Guidelines.pptx" --brand x402-brand.json --max-slides 22
  python3 ../scripts/render_check.py "x402 Foundation Brand Guidelines.pptx"
