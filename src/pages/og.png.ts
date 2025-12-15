import type { APIRoute } from "astro";

// OG image generation disabled
export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 404,
    statusText: "Not found",
  });
};
