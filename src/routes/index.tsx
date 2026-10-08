import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/agentos/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgentOS — Tell them the job. Check back when it matters." },
      {
        name: "description",
        content:
          "A calm desk for AI helpers. Hand off research, writing, planning, and follow-ups, then approve what is worth keeping.",
      },
    ],
  }),
  component: LandingPage,
});
