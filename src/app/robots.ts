export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin",
      },
    ],
    sitemap: "https://relaunch-dev.vercel.app/sitemap.xml",
    host: "https://relaunch-dev.vercel.app",
  };
}
