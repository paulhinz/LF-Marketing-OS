x402 Foundation example at the intended density (one idea per slide, a table or six short bullets, detail in notes). `logos/` holds the x402 wordmark rendered from https://x402.org/wp-content/uploads/sites/10/2026/06/x402_logo.svg (read 7 Oct 2026) in ink, white and square-padded variants; x402 is a trademark of LF Projects, LLC and the files are for testing the renderer only.

Build from inside this folder:
  python3 ../scripts/build_deck.py x402-deck.json "x402 Foundation Messaging Document.pptx" --brand x402-brand.json --max-slides 20
  python3 ../scripts/render_check.py "x402 Foundation Messaging Document.pptx"
