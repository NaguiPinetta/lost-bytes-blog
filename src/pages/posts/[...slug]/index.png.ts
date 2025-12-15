import type { APIRoute } from "astro";

// OG image generation disabled
export async function getStaticPaths() {
  return [];
}

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 404,
    statusText: "Not found",
  });
};
