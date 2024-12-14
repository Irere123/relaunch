import { db } from "@/db";
import { analytics } from "@/db/schema";
import { geolocation } from "@vercel/edge";

export const runtime = "edge";

export async function POST(request: Request) {
  const date = new Date().toISOString();
  const { projectId, slug } = await new Response(request.body).json();

  const { city, country, flag, latitude, longitude } = geolocation(request);

  if (!(flag && country && city && latitude && longitude && projectId)) {
    return Response.json({ message: "Missing required parameters" });
  } else {
    await db.insert(analytics).values({
      city,
      country,
      date,
      flag,
      latitude,
      longitude,
      projectId,
      slug,
    });

    return Response.json({ message: "A OK" });
  }
}
