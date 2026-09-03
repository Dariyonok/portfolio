/**
 * Replaces the space after any 1-2 letter word (e.g. "я", "и", "в", "на",
 * "по", "но") with a non-breaking space, so short prepositions/conjunctions
 * never get orphaned alone at the end of a line — standard Russian
 * typography practice.
 *
 * Safe to run on text before handing it to RevealText: it splits words on
 * a literal " ", and   isn't one, so a short-word+nbsp pair just
 * reveals as a single unit, which reads fine.
 */
export function nbsp(text: string): string {
  // No `\b` here on purpose: JS's `\b` is ASCII-only (defined against
  // `\w` = [A-Za-z0-9_]) and doesn't recognize Cyrillic as "word"
  // characters, so it silently fails to match any Cyrillic word boundary
  // at all — the whole function was a silent no-op on Russian text.
  // `(^|\s)` does the same job without that gap.
  return text.replace(/(^|\s)([а-яёА-ЯЁa-zA-Z]{1,2})\s/g, "$1$2 ");
}
