// app/data/all_blogs_merged.js
// ═══════════════════════════════════════════════════
// Master blog registry — 42 published + 114 drafts
// ═══════════════════════════════════════════════════

import { BLOG_POSTS } from "./blogs"
import DRAFT_BLOGS from "./blogs_drafts"
import DRAFT_BLOGS_EXTRA from "./blogs_drafts_extra"
import { ALL_DRAFT_BLOGS_FINAL_PLUS as DRAFT_BLOGS_FINAL } from "./blogs_drafts_final"

// ALL 156 blogs — safe to import, no localStorage calls here
export const ALL_BLOGS = [
  ...BLOG_POSTS,
  ...DRAFT_BLOGS,
  ...DRAFT_BLOGS_EXTRA,
  ...DRAFT_BLOGS_FINAL,
]

export default ALL_BLOGS
