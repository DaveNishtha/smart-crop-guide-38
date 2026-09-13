import { createFileRoute, redirect } from "@tanstack/react-router";

// Home navigates straight to the Dashboard.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});
