# Known stable LFX identifiers

These UIDs are stable within LFX and can be reused across runs without re-deriving
them by name search.

## The Linux Foundation (root parent)

- **UID**: `451efe4e-9322-4b58-97f5-c8e57b5b99f4`
- Nearly all top-level umbrella foundations and standalone projects (CNCF, PyTorch
  Foundation, FINOS, LF Energy, LF Networking, LF Decentralized Trust, OpenSSF, etc.)
  have this as their `parent_uid`.
- As of the last full run there were ~100 top-level entities under this parent,
  spanning 2-3 pages at `page_size: 100`.

## The Linux Kernel Organization

- **UID**: `3c35cc53-1f86-49ea-b556-18e51cb92e42`
- **slug**: `korg`
- Has 0 registered sub-projects, 0 active LFX memberships, and $0 in LFX-tracked
  membership revenue. This is expected and not a data error — see SKILL.md Step 3.

### Suggested note text for the Linux Kernel Organization row

> Distributes the Linux kernel itself. Excluded from ranking by design: kernel.org is
> funded via direct corporate/individual contributions to the Kernel Fund and
> infrastructure, not LFX tiered memberships — so it shows 0 members/$0 revenue in this
> system even though it underpins the entire LF ecosystem. Real-world funding/scale is
> not captured by LFX membership data.

## Known lens undercounting examples (for calibration, not hardcoding)

The lens tool's "active sub-project count" metric has been observed to undercount
badly for foundations whose technical projects are organized as separate legal/"Series
LLC" entities rather than direct children in the model it queries. Observed true vs.
lens-reported counts:

| Foundation | Lens-reported | Actual active (via search_projects) |
|---|---|---|
| PyTorch Foundation | 1 | 5 |
| FINOS | 1 (naive prompt) / 55 (refined prompt) | 55 |
| LF AI & Data | 1 (naive prompt) / 60 (refined prompt) | ~60 |

Always do the Step 5 correction for finalists rather than trusting either the naive or
refined lens count at face value.
