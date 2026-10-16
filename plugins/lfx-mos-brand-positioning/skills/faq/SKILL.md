---
name: faq
description: "This skill should be used to \"write a project FAQ\", \"draft questions and answers for the website\", \"prepare press Q&A\", \"what will members and journalists ask\" or \"refresh a project's FAQ\" for a Linux Foundation project. It returns the faq content as JSON: grouped questions answered only from the sources, with unanswered questions flagged for the team.\n"
metadata:
  version: "0.5.0"
---

# FAQ

Stateless: read the input object (`references/input.md`), return JSON in the shape in `references/output-schema.md`. Never read or write a database.

## 1. Read
- The sources (input contract). Answers come only from them. If there's no launch press release, search linuxfoundation.org/press for the project name.
- `context.mf`, `context.icp` and `context.mh` when present. Use them to choose questions (each ICP's `objection` is a candidate question, and the framework's goals suggest the groups) and to word answers in the framework's terms. Facts still come from the sources.

## 2. Draft
- 3–4 groups, 8–10 questions in total, the questions a newcomer, member or journalist would actually ask. Typical groups: About, Projects or Platform, Membership and governance, Getting involved.
- Answer in one to three sentences, plain and specific, and name the source of each answer.
- Include one or two realistic questions the sources don't answer (membership cost is a common one) with `null` answer and `null` source. They show as "needs an answer from your team". Include any ICP objection whose response is `null`.
- Where an answer carries a key message, use the framework's wording; never a phrase from `mf.avoid`.

## 3. Check before returning
- Every answer traces to a source you read. No invented members, people, prices, dates or quotes.
- US English, sentence case, no em-dash asides, no "not X but Y" framing.
- JSON matches the schema; list the unanswered questions in `report.gaps` too.

**Revising** (`revision` present): keep what isn't mentioned; fill a `null` answer only from a source the notes or sources now provide.

## Checking edits (`revision.mode: "check"`)
A person edited the FAQ by hand. Return it unchanged, except: an empty answer becomes `null` with a `null` source. List in `report.notes` any answer with no source label, any answer that states something the sources don't, and any phrase from `mf.avoid`; put every `null` answer in `report.gaps`.
