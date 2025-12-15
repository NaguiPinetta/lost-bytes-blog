export const SITE = {
  website: "https://lost-bytes-blog.vercel.app", // TODO: Update to your final Vercel domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "Notes, experiments, and fragments I didn't want to lose.",
  title: "Lost Bytes",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 0, // Disabled - no scheduled post filtering
  showArchives: false, // Disabled
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false, // Disabled
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: false, // Disabled
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
