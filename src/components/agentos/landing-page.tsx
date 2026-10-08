import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Menu, X } from "lucide-react";
import { Mark } from "@/components/agentos/mark";
import { DUE_LABEL, STATUS_LABEL, initialAgents, type Status } from "@/lib/agentos/model";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#team", label: "The team" },
  { href: "#questions", label: "Questions" },
];

const STEPS = [
  {
    n: "01",
    title: "Say the job in normal words",
    body: "No special format. Write it the way you would ask a colleague: what you need, and anything they should know.",
  },
  {
    n: "02",
    title: "The right helper picks it up",
    body: "Research, writing, planning, and follow-ups go to different people. You can also choose who gets it.",
  },
  {
    n: "03",
    title: "You only step in to decide",
    body: "When a first pass is ready, it waits for you. Approve it, or send a short note back. Nothing ships on its own.",
  },
];

const QUESTIONS = [
  {
    q: "Do I need an account?",
    a: "No. This desk stays in your browser. Add tasks, approve work, pause a helper — it will still be here when you come back on this device.",
  },
  {
    q: "Will it send emails or messages for me?",
    a: "No. Helpers prepare the work. You approve it. That is the whole point of a desk instead of a chat that just keeps going.",
  },
  {
    q: "What if I only need one kind of help?",
    a: "Pause the others. A paused helper keeps their queue and does not start anything new until you turn them back on.",
  },
  {
    q: "Can I start over?",
    a: "Yes. Inside the desk there is a quiet “Start fresh” control that puts the sample team back. Your browser copy is the only copy.",
  },
];

const PREVIEW: { who: string; role: string; title: string; status: Status }[] = [
  {
    who: "Mira",
    role: "Research",
    title: "Which notes app is easiest for a small team?",
    status: "needs_you",
  },
  {
    who: "Jules",
    role: "Writing",
    title: "A kind reply about the slipped launch",
    status: "working",
  },
  {
    who: "Theo",
    role: "Planning",
    title: "Monday in five lines, afternoon kept free",
    status: "queued",
  },
];

function statusClass(status: Status) {
  if (status === "needs_you") return "bg-clay-soft text-clay";
  if (status === "working") return "bg-moss-soft text-moss";
  if (status === "done") return "bg-bg text-ink";
  return "bg-bg text-muted";
}

export function LandingPage() {
  const [open, setOpen] = useState(false);
  const team = initialAgents();

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Link to="/" className="flex items-center gap-2.5 text-ink">
            <Mark />
            <span className="display text-xl">AgentOS</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex" aria-label="Page">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/desk"
              search={{ view: "today", prefill: "" }}
              className="inline-flex h-11 items-center rounded-lg bg-clay px-4 text-sm font-semibold text-surface hover:opacity-90"
            >
              Open the desk
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-ink md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line px-5 py-3 md:hidden" aria-label="Page">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex h-11 items-center text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-semibold tracking-wide text-clay">A simpler way to work with AI</p>
            <h1 className="display mt-3 text-4xl text-ink sm:text-6xl">
              Tell them the job. Check back when it matters.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              AgentOS is one calm desk for research, writing, planning, and follow-ups. You say what you need.
              A helper does the first pass. You approve what is worth keeping.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/desk"
                search={{ view: "today", prefill: "" }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 font-semibold text-bg hover:opacity-90"
              >
                Try the desk
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-line bg-surface px-5 font-semibold text-ink"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">No account. Your desk stays on this device.</p>
          </div>

          <div className="panel p-4 sm:p-5" aria-label="A peek at the desk">
            <div className="flex items-center justify-between gap-3 px-1 pb-4">
              <div>
                <p className="text-sm text-muted">Today</p>
                <p className="display text-2xl">2 things moving, 1 needs you</p>
              </div>
              <span className="rounded-full bg-clay-soft px-3 py-1 text-sm font-semibold text-clay">Live sample</span>
            </div>
            <ul className="space-y-2">
              {PREVIEW.map((item) => (
                <li key={item.title} className="rounded-lg border border-line bg-bg px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted">
                      {item.who} · {item.role}
                    </p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                      {STATUS_LABEL[item.status]}
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-ink">{item.title}</p>
                </li>
              ))}
            </ul>
            <p className="px-1 pt-4 text-sm text-muted">Due labels like “{DUE_LABEL.today}” stay in plain language.</p>
          </div>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
            {[
              ["Ask like a person", "A sentence is enough. Example chips show the kind of job that works well."],
              ["See who has it", "Every task names a helper and a status you can read without a legend."],
              ["Approve before it counts", "Finished means you said so. Sending a note back is one field, not a new chat."],
            ].map(([title, body]) => (
              <div key={title}>
                <Check className="size-5 text-moss" aria-hidden="true" />
                <h2 className="display mt-3 text-2xl">{title}</h2>
                <p className="mt-2 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-4xl">How the desk works</h2>
          <p className="mt-3 max-w-2xl text-muted">Three steps. The same ones every time, so you never hunt for the next button.</p>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="panel p-6">
                <p className="display text-3xl text-clay">{step.n}</p>
                <h3 className="display mt-4 text-2xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="team" className="bg-ink text-bg">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="display text-4xl">A small team, with obvious jobs</h2>
            <p className="mt-3 max-w-2xl text-bg/75">
              You do not manage a swarm. Four helpers cover the work most people actually hand off.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {team.map((agent) => (
                <li key={agent.id} className="rounded-xl border border-bg/15 p-5">
                  <p className="text-sm font-semibold text-clay-soft">{agent.role}</p>
                  <h3 className="display mt-1 text-3xl">{agent.name}</h3>
                  <p className="mt-2 text-bg/80">{agent.blurb}</p>
                  <p className="mt-4 text-sm text-bg/60">Good for: {agent.helps}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2">
          <div className="rounded-xl border border-line p-6">
            <p className="text-sm font-semibold text-muted">A long chat</p>
            <h2 className="display mt-2 text-3xl">The work disappears up the thread</h2>
            <ul className="mt-4 space-y-3 text-muted">
              <li>You scroll to remember who was doing what.</li>
              <li>A half-finished draft looks the same as a finished one.</li>
              <li>There is no obvious place to say “yes, keep this.”</li>
            </ul>
          </div>
          <div className="panel p-6">
            <p className="text-sm font-semibold text-clay">The desk</p>
            <h2 className="display mt-2 text-3xl">The work has a place and a status</h2>
            <ul className="mt-4 space-y-3 text-ink">
              <li>Today shows only what needs you and what is moving.</li>
              <li>Each card says who, what, and whether it is waiting on you.</li>
              <li>Approve and send-back sit on the work itself.</li>
            </ul>
          </div>
        </section>

        <section id="questions" className="mx-auto max-w-3xl px-5 pb-16">
          <h2 className="display text-4xl">Questions</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {QUESTIONS.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  {item.q}
                  <span className="text-muted group-open:hidden" aria-hidden="true">
                    +
                  </span>
                  <span className="hidden text-muted group-open:inline" aria-hidden="true">
                    –
                  </span>
                </summary>
                <p className="mt-2 max-w-2xl text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-2xl bg-clay px-6 py-10 text-surface sm:px-10">
            <h2 className="display text-4xl">Open the desk. A sample team is already there.</h2>
            <p className="mt-3 max-w-xl text-surface/90">
              Approve Mira’s notes comparison, or add a task of your own. It takes about a minute to see how it feels.
            </p>
            <Link
              to="/desk"
              search={{ view: "approvals", prefill: "" }}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-surface px-5 font-semibold text-ink"
            >
              Review what needs you
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Mark className="size-7" />
            AgentOS
          </p>
          <p>A calm place to hand work to helpers and take it back.</p>
        </div>
      </footer>
    </div>
  );
}
