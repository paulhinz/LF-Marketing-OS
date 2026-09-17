# Eval inputs

Eval 1 expects the three x402 documents at `evals/files/x402/`:

- `x402_Brand_Kit.md`
- `x402_Message_Foundation.md`
- `x402_Target_Markets_and_ICP.md`

Export them from the Drive folder (File → Download → Markdown, or the agents' original .docx/.md outputs) and drop them here. They are not bundled with the skill because they contain LFX membership list-price figures that should stay inside LF.

The expected findings for a correct run are in `references/x402-worked-example.md`. Any change to the generating agents can be regression-tested by re-running eval 1 and checking that the same findings appear — or, after the agents are fixed and re-run on x402, that they no longer do.
