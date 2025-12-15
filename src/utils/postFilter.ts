import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  // Simple filter: only exclude drafts, no scheduled post logic
  return !data.draft;
};

export default postFilter;
