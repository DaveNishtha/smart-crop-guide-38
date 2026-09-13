import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AgriSmart AI" },
      { name: "description", content: "Your farm at a glance: crop health, soil moisture, weather and AI insights." },
      { property: "og:title", content: "Dashboard — AgriSmart AI" },
      { property: "og:description", content: "Your farm at a glance: crop health, soil moisture, weather and AI insights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});
