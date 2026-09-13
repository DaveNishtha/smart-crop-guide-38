import { createFileRoute } from "@tanstack/react-router";
import DiseaseDetection from "@/pages/DiseaseDetection";

export const Route = createFileRoute("/diagnosis")({
  head: () => ({
    meta: [
      { title: "Crop Diagnosis — AgriSmart AI" },
      { name: "description", content: "Upload a photo of your crop leaf and detect diseases with AI analysis." },
      { property: "og:title", content: "Crop Diagnosis — AgriSmart AI" },
      { property: "og:description", content: "Upload a photo of your crop leaf and detect diseases with AI analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DiseaseDetection,
});
