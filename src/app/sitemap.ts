import { getProjects } from "@/modules/projects/get-projects";

export default async function sitemap() {
  const projects = await getProjects();
  return [
    {
      url: "https://relaunch-dev.vercel.app/",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `https://relaunch-dev.vercel.app/projects/${project.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    })),
  ];
}
