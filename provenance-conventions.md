# Provenance conventions

How to write the `PROVENANCE.md` that sits beside each skill.

1. **Credit the authorship precisely.** Open with "This skill was written by <model and version> operating in <harness and version> to distill…", for example "Claude Opus 5 operating in Claude Code 2.x". Use "distill" because the skill is drawn out of work that already succeeded, not specified in advance. If you can't recover the model or harness version, name that gap (see 10) rather than guessing.

2. **Write in the user's voice.** The note is the user's account of where the skill came from, narrated in their first person ("a review it carried out with me", "I asked Claude…"). The model that writes the note is only delivering it, so it doesn't speak as itself.

3. **Anchor the occasion without naming the project.** Give the date and the specific task, set inside a project described in general terms. For example, "a UX review of the file-upload page in an editorial workflow app", not the project's own name. Check the date against the evidence; a conversation's visible timestamp may only show when it was last opened.

4. **Locate the principles in the user's words.** Find the message where the principles were set, usually a correction or a definition, and quote it. Let the quotes explain; your job is to frame them.

5. **Record the request.** Quote the moment the user asked for the skill. That's where the work became reusable.

6. **Tidy typos, and say so.** Fix spelling inside quotes, but leave grammar as written so you don't put words in the user's mouth. After the quoted note, outside the quotation, add the italic line *Typos in quotations from Oualid's prompts have been corrected in accordance with the requirement in provenance-conventions.md.*

7. **Include the lead-up and the follow-through.** Name the earlier problem the skill answers, any testing right after it was written, and its lineage to other skills.

8. **Keep the form plain.** Write short paragraphs with no headings inside the note. Use a list only for a real sequence of steps.

9. **Keep it short.** Use one to four paragraphs. Say where the skill came from and stop; don't summarise the skill.

10. **Don't invent what you can't recover.** If the evidence is gone, such as deleted transcripts, an unknown author or an unrecorded model version, leave the claim out or name the gap. Quote only turns you can see.

11. **Keep it beside the skill, not inside it.** Put the note in `PROVENANCE.md` next to `SKILL.md`. Anything in `SKILL.md` is loaded every time the skill runs, and provenance is for people, not for the model doing the work.

12. **Format the file as an exchange.** `PROVENANCE.md` records the request and the note that answered it. The model's turn gives the note as a quotation, in quotation marks, and the typo disclosure follows outside it:

    > **Oualid:** Write the provenance note to this skill according to provenance-conventions.md.
    >
    > **Claude Opus 5.5:** "This skill was written by …"
    >
    > *Typos in quotations from Oualid's prompts have been corrected in accordance with the requirement in provenance-conventions.md.*

    Label the turn with the model and version that wrote the note, which may differ from the one that wrote the skill. Quotes from the user inside the note take single quotation marks, so they nest inside the outer pair.
