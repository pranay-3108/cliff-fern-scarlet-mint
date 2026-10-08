import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DeskApp } from "@/components/agentos/desk-app";
import { useDesk, type View } from "@/lib/agentos/model";

function parseView(value: unknown): View {
  return value === "team" || value === "tasks" || value === "approvals" ? value : "today";
}

export const Route = createFileRoute("/desk")({
  validateSearch: (search: Record<string, unknown>) => ({
    view: parseView(search.view),
    prefill: typeof search.prefill === "string" ? search.prefill.slice(0, 280) : "",
  }),
  head: () => ({
    meta: [
      { title: "Your desk — AgentOS" },
      {
        name: "description",
        content: "See what your helpers are doing, approve work, and add a task in plain language.",
      },
    ],
  }),
  component: DeskRoute,
});

function DeskRoute() {
  const { view, prefill } = Route.useSearch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void useDesk.persist.rehydrate();
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen px-5 py-16">
        <p className="text-sm font-semibold text-clay">AgentOS</p>
        <h1 className="display mt-2 text-4xl">Opening your desk…</h1>
      </div>
    );
  }

  return <DeskApp view={view} prefill={prefill} />;
}
