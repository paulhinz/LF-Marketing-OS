# Case Study Agent

An LFX Marketing OS agent that converts any source content into an on-brand
Word document for a Linux Foundation project or foundation.

## What it does

Give it a YouTube video, an interview transcript, meeting notes, a recording,
or raw text, and tell it which project's brand to use. It:

1. Acquires the content (auto-fetches YouTube transcripts; reads uploaded
   files; pulls from connected meeting tools)
2. Loads the project's brand from its Brand Kit and Message Foundation
   documents, falling back to web research of the project's official brand
   guidelines if those don't exist yet
3. Drafts the deliverable — a case study by default, or a blog post, article,
   executive summary, or Q&A on request
4. Builds a branded .docx (brand colors, styled pull quotes, boilerplate,
   clear placeholders for anything the source didn't provide)

## How to trigger it

Say things like:

- "Turn this video into a case study for CNCF: [YouTube URL]"
- "Convert this transcript into a case study for [project]"
- "Run the Case Study Agent"
- "Make a blog post from this interview in [project]'s brand"

## Notes

- Output is always a first draft for human review. The agent never invents
  metrics or quotes — gaps are marked `[NEEDED FROM INTERVIEWEE: ...]`.
- Works best when the project's Brand Kit and Message Foundation docs exist
  (produced by the Brand Kit Agent and Message Foundation Agent).

## Author

Paul Hinz, Linux Foundation — LFX Marketing OS
