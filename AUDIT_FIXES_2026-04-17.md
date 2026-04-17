`/ops/replies` audit fixes shipped on 2026-04-17.

Scope:
- Guarded the inbox so an empty-but-reachable Supabase mirror does not blank
  the page.
- When the mirror returns `[]`, the page now falls back to the daemon snapshot
  (`recent_replies`) until mirror sync catches up.

Why:
- The mirror table can exist before the daemon has populated it, and the old
  logic treated `[]` as authoritative.

Verification:
- `npm run build`
