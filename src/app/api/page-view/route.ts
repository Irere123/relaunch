import { db } from "@/db";
import { analytics } from "@/db/schema";
import { geolocation } from "@vercel/functions";

export const runtime = "edge";

export async function POST(request: Request) {
  const date = new Date().toISOString();

  try {
    const { projectId, slug } = await request.json();

    if (!projectId || !slug) {
      return Response.json(
        { message: "Missing projectId or slug" },
        { status: 400 }
      );
    }

    // geolocation data from (Edge runtime)
    const { city, country, flag, latitude, longitude } =
      geolocation(request) || {};

    await db.insert(analytics).values({
      city: city || null,
      country: country || null,
      date,
      flag: flag || null,
      latitude: latitude || null,
      longitude: longitude || null,
      projectId,
      slug,
    });

    return Response.json({ message: "A OK" });
  } catch (error) {
    console.error("Error recording page view:", error);
    return Response.json(
      { message: "Failed to record page view" },
      { status: 500 }
    );
  }
}
