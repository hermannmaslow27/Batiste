import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://batiste-five.vercel.app";

  return {  
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/onboarding/", "/profile/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}