import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort((a, b) => {
      const dateA = new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime();
      const dateB = new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime();
      return dateB - dateA; // newest first
    });
};

export default getSortedPosts;
