import { createFileRoute } from "@tanstack/react-router";
import CropRecommendation from "@/pages/CropRecommendation";

export const Route = createFileRoute("/crop-recommendation")({
  head: () => ({
    meta: [
      { title: "Crop Recommendation — AgriSmart AI" },
      { name: "description", content: "Get the best crop recommendation for your soil, season and water conditions." },
      { property: "og:title", content: "Crop Recommendation — AgriSmart AI" },
      { property: "og:description", content: "Get the best crop recommendation for your soil, season and water conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CropRecommendation,
});
