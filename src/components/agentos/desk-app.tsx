import { Link, useNavigate } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  Check,
  CirclePause,
  CirclePlay,
  ListChecks,
  Search,
  SunMedium,
  Users,
  X,
} from "lucide-react";
import { Mark } from "@/components/agentos/mark";
import {
  DUE_LABEL,
  STATUS_LABEL,
  ago,
  titleOf,
  useDesk,
  type AgentId,
  type Due,
  type Status,
  type Task,
  type View,
} from "@/lib/agentos/model";

const VIEWS: { id: View; label: string; icon: typeof SunMedium }[] = [
  { id: "today", label: "Today", icon: SunMedium },
  { id: "team", label: "Team", icon: Users },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "approvals", label: "Approvals", icon: Check },
];

const EXAMPLES = [
  "Summarize the three risks in this week’s plan",
  "Draft a kind reply to a delayed client",
  "Plan my Monday in five lines",
];

function statusClass(status: Status) {
  if (status === "needs_you") return "bg-clay-soft text-clay";
  if (status === "working") return "bg-moss-soft text-moss";
  if (status === "done") return "bg-bg text-muted";
  return "bg-bg text-muted";
}

export function DeskApp({ view, prefill }: { view: View; prefill: string }) {
  const navigate = useNavigate();
  const agents = useDesk((s) => s.agents);
  const tasks = useDesk((s) => s.tasks);
  const welcomed = useDesk((s) => s.welcomed);
  const flash = useDesk((s) => s.flash);
  const addTask = useDesk((s) => s.addTask);
  const approve = useDesk((s) => s.approve);
  const sendBack = useDesk((s) => s.sendBack);
  const togglePause = useDesk((s) => s.togglePause);
  const dismissWelcome = useDesk((s) => s.dismissWelcome);
  const clearFlash = useDesk((s) => s.clearFlash);
  const tick = useDesk((s) => s.tick);
  const reset = useDesk((s) => s.reset);

  const [brief, setBrief] = useState(prefill);
  const [agentId, setAgentId] = useState<AgentId | "auto">("auto");
  const [due, setDue] = useState<Due>("today");
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => tick(), 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => clearFlash(), 4200);
    return () => window.clearTimeout(id);
  }, [flash, clearFlash]);

  const waiting = tasks.filter((task) => task.status === "needs_you");
  const moving = tasks.filter((task) => task.status === "working" || task.status === "queued");
  const selected = tasks.find((task) => task.id === selectedId) ?? null;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((task) => {
      if (filter !== "all" && task.status !== filter) return false;
      if (!q) return true;
      const agent = agents.find((item) => item.id === task.agentId);
      return `${task.brief} ${agent?.name ?? ""}`.toLowerCase().includes(q);
    });
  }, [tasks, filter, query, agents]);

  function submit(event?: FormEvent) {
    event?.preventDefault();
    const problem = addTask({ brief, agentId, due });
    if (problem) {
      setError(problem);
      return;
    }
    setBrief("");
    setError(null);
    setDue("today");
  }

  function openTask(id: string) {
    setSelectedId(id);
    setNote("");
  }

  const copy: Record<View, { title: string; body: string }> = {
    today: { title: "Today", body: "What needs you, and what is already moving." },
    team: { title: "Team", body: "Four helpers. Pause anyone you do not need today." },
    tasks: { title: "Tasks", body: "Every job on the desk, in one list." },
    approvals: { title: "Approvals", body: "Nothing is finished until you say so." },
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <div className="md:grid md:grid-cols-[16rem_1fr]">
        <aside className="hidden min-h-screen border-r border-line bg-surface md:flex md:flex-col">
          <Link to="/" className="flex h-16 items-center gap-2.5 px-5 text-ink">
            <Mark />
            <span className="display text-xl">AgentOS</span>
          </Link>
          <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Desk">
            {VIEWS.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              const count = item.id === "approvals" ? waiting.length : 0;
              return (
                <Link
                  key={item.id}
                  to="/desk"
                  search={{ view: item.id, prefill: "" }}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-11 items-center justify-between rounded-lg px-3 text-sm font-semibold ${
                    active ? "bg-ink text-bg" : "text-ink hover:bg-bg"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="size-4" />
                    {item.label}
                  </span>
                  {count > 0 ? (
                    <span className={`rounded-full px-2 text-xs ${active ? "bg-bg text-ink" : "bg-clay-soft text-clay"}`}>
                      {count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="p-4">
            {confirmReset ? (
              <div className="rounded-lg border border-line bg-bg p-3 text-sm">
                <p className="font-semibold">Put the sample team back?</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="h-10 flex-1 rounded-md bg-ink text-sm font-semibold text-bg"
                    onClick={() => {
                      reset();
                      setConfirmReset(false);
                    }}
                  >
                    Yes, reset
                  </button>
                  <button
                    type="button"
                    className="h-10 flex-1 rounded-md border border-line bg-surface text-sm font-semibold"
                    onClick={() => setConfirmReset(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="h-11 w-full rounded-lg text-sm font-medium text-muted hover:text-ink"
                onClick={() => setConfirmReset(true)}
              >
                Start fresh
              </button>
            )}
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-bg/90 px-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-2 md:hidden">
              <Mark className="size-8" />
              <span className="display text-lg">AgentOS</span>
            </div>
            <p className="hidden text-sm text-muted md:block">Desk · saved on this device</p>
            <Link
              to="/"
              className="inline-flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-ink"
            >
              <ArrowLeft className="size-4" />
              Home
            </Link>
          </header>

          <main className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
            <h1 className="display text-4xl">{copy[view].title}</h1>
            <p className="mt-1 text-muted">{copy[view].body}</p>

            {flash ? (
              <p className="rise mt-4 rounded-lg bg-moss-soft px-4 py-3 text-sm font-medium text-moss" role="status">
                {flash}
              </p>
            ) : null}

            {view === "today" ? (
              <div className="mt-6 space-y-6">
                {welcomed ? null : (
                  <div className="flex items-start justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                    <p className="text-sm text-ink">
                      Start with anything that needs a look. Or add a task in one sentence — the desk picks a helper.
                    </p>
                    <button
                      type="button"
                      className="h-10 shrink-0 rounded-lg bg-ink px-3 text-sm font-semibold text-bg"
                      onClick={dismissWelcome}
                    >
                      Got it
                    </button>
                  </div>
                )}

                <TaskGroup
                  title="Needs a look"
                  empty="Nothing is waiting on you."
                  tasks={waiting}
                  agents={agents}
                  onOpen={openTask}
                />

                <form id="composer" onSubmit={submit} className="panel p-4 sm:p-5">
                  <label htmlFor="brief" className="font-semibold">
                    What needs doing?
                  </label>
                  <p className="mt-1 text-sm text-muted">One sentence is enough. Add detail if it helps.</p>
                  <textarea
                    id="brief"
                    value={brief}
                    onChange={(event) => {
                      setBrief(event.target.value);
                      if (error) setError(null);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                        event.preventDefault();
                        submit();
                      }
                    }}
                    rows={3}
                    placeholder="Example: Draft a short update about Friday’s launch."
                    className="mt-3 w-full resize-y rounded-lg border border-line bg-bg px-3 py-3 text-ink outline-none focus:border-clay"
                  />
                  {error ? <p className="mt-2 text-sm font-medium text-clay">{error}</p> : null}

                  <fieldset className="mt-4">
                    <legend className="text-sm font-semibold">Who should take it?</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Choice on={agentId === "auto"} onClick={() => setAgentId("auto")}>
                        Best fit
                      </Choice>
                      {agents.map((agent) => (
                        <Choice key={agent.id} on={agentId === agent.id} onClick={() => setAgentId(agent.id)}>
                          {agent.name}
                          {agent.paused ? " · paused" : ""}
                        </Choice>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="mt-4">
                    <legend className="text-sm font-semibold">When?</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(Object.keys(DUE_LABEL) as Due[]).map((key) => (
                        <Choice key={key} on={due === key} onClick={() => setDue(key)}>
                          {DUE_LABEL[key]}
                        </Choice>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">Ctrl or ⌘ Enter also adds it.</p>
                    <button type="submit" className="h-12 rounded-lg bg-clay px-5 font-semibold text-surface">
                      Add to the desk
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {EXAMPLES.map((example) => (
                      <button
                        key={example}
                        type="button"
                        className="rounded-full border border-line bg-bg px-3 py-2 text-left text-sm text-ink hover:border-ink"
                        onClick={() => {
                          setBrief(example);
                          setError(null);
                        }}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </form>

                <TaskGroup
                  title="Moving"
                  empty="Nothing is in progress. Add a task above."
                  tasks={moving}
                  agents={agents}
                  onOpen={openTask}
                />
              </div>
            ) : null}

            {view === "team" ? (
              <ul className="mt-6 grid gap-3">
                {agents.map((agent) => {
                  const current = tasks.find(
                    (task) => task.agentId === agent.id && (task.status === "working" || task.status === "needs_you"),
                  );
                  const open = tasks.filter((task) => task.agentId === agent.id && task.status !== "done").length;
                  return (
                    <li key={agent.id} className="panel p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-clay">{agent.role}</p>
                          <h2 className="display text-3xl">{agent.name}</h2>
                          <p className="mt-1 text-muted">{agent.blurb}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            agent.paused ? "bg-bg text-muted" : "bg-moss-soft text-moss"
                          }`}
                        >
                          {agent.paused ? "Paused" : "Available"}
                        </span>
                      </div>
                      <p className="mt-4 text-sm text-ink">
                        {agent.paused
                          ? "New tasks will wait in the queue."
                          : current
                            ? `Currently: ${titleOf(current.brief)}`
                            : "Free right now."}
                      </p>
                      <p className="mt-1 text-sm text-muted">{open} open · good for {agent.helps}</p>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-semibold"
                          onClick={() => togglePause(agent.id)}
                        >
                          {agent.paused ? <CirclePlay className="size-4" /> : <CirclePause className="size-4" />}
                          {agent.paused ? "Resume" : "Pause"}
                        </button>
                        <button
                          type="button"
                          className="h-11 rounded-lg bg-ink px-4 text-sm font-semibold text-bg"
                          onClick={() => {
                            setAgentId(agent.id);
                            void navigate({ to: "/desk", search: { view: "today", prefill: "" } });
                            window.setTimeout(() => {
                              document.getElementById("composer")?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 50);
                          }}
                        >
                          Give {agent.name} a task
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {view === "tasks" ? (
              <div className="mt-6">
                <label className="relative block">
                  <span className="sr-only">Search tasks</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by task or name"
                    className="h-12 w-full rounded-lg border border-line bg-surface pr-3 pl-10 outline-none focus:border-clay"
                  />
                </label>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter tasks">
                  {(["all", "needs_you", "working", "queued", "done"] as const).map((key) => (
                    <Choice key={key} on={filter === key} onClick={() => setFilter(key)}>
                      {key === "all" ? "All" : STATUS_LABEL[key]}
                    </Choice>
                  ))}
                </div>
                <div className="mt-4">
                  {visible.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-muted">
                      No tasks match. Clear the search or add something new on Today.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {visible.map((task) => (
                        <TaskButton key={task.id} task={task} agents={agents} onOpen={openTask} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : null}

            {view === "approvals" ? (
              <div className="mt-6 space-y-3">
                {waiting.length === 0 ? (
                  <div className="panel px-5 py-10 text-center">
                    <p className="display text-3xl">You’re clear</p>
                    <p className="mt-2 text-muted">Nothing is waiting on a decision.</p>
                    <button
                      type="button"
                      className="mt-4 h-11 rounded-lg bg-ink px-4 text-sm font-semibold text-bg"
                      onClick={() => void navigate({ to: "/desk", search: { view: "today", prefill: "" } })}
                    >
                      Add a task
                    </button>
                  </div>
                ) : (
                  waiting.map((task) => {
                    const agent = agents.find((item) => item.id === task.agentId);
                    return (
                      <article key={task.id} className="panel p-5">
                        <p className="text-sm font-semibold text-clay">
                          {agent?.name} · {agent?.role}
                        </p>
                        <h2 className="display mt-1 text-2xl">{titleOf(task.brief)}</h2>
                        <p className="mt-3 text-ink">{task.result}</p>
                        <p className="mt-2 text-sm text-muted">
                          {DUE_LABEL[task.due]} · updated {ago(task.updatedAt)}
                        </p>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                          <button
                            type="button"
                            className="h-11 rounded-lg bg-moss px-4 text-sm font-semibold text-surface"
                            onClick={() => approve(task.id)}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold"
                            onClick={() => openTask(task.id)}
                          >
                            Send a note back
                          </button>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            ) : null}
          </main>
        </div>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface md:hidden"
        aria-label="Desk"
      >
        {VIEWS.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <Link
              key={item.id}
              to="/desk"
              search={{ view: item.id, prefill: "" }}
              aria-current={active ? "page" : undefined}
              className={`flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${
                active ? "text-clay" : "text-muted"
              }`}
            >
              <Icon className="size-5" />
              {item.label}
              {item.id === "approvals" && waiting.length > 0 ? (
                <span className="sr-only">{waiting.length} waiting</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelectedId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-surface p-5 outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
            {selected ? (
              <TaskDetail
                task={selected}
                agentName={agents.find((item) => item.id === selected.agentId)?.name ?? "Helper"}
                note={note}
                onNote={setNote}
                onApprove={() => {
                  approve(selected.id);
                  setSelectedId(null);
                }}
                onSend={() => {
                  if (!note.trim()) return;
                  sendBack(selected.id, note);
                  setSelectedId(null);
                }}
              />
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function Choice({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-10 rounded-full px-3 text-sm font-semibold ${
        on ? "bg-ink text-bg" : "border border-line bg-surface text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function TaskGroup({
  title,
  empty,
  tasks,
  agents,
  onOpen,
}: {
  title: string;
  empty: string;
  tasks: Task[];
  agents: { id: AgentId; name: string }[];
  onOpen: (id: string) => void;
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold tracking-wide text-muted">{title}</h2>
      {tasks.length === 0 ? (
        <p className="mt-2 rounded-xl border border-dashed border-line px-4 py-6 text-muted">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {tasks.map((task) => (
            <TaskButton key={task.id} task={task} agents={agents} onOpen={onOpen} />
          ))}
        </ul>
      )}
    </section>
  );
}

function TaskButton({
  task,
  agents,
  onOpen,
}: {
  task: Task;
  agents: { id: AgentId; name: string }[];
  onOpen: (id: string) => void;
}) {
  const agent = agents.find((item) => item.id === task.agentId);
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(task.id)}
        className={`w-full rounded-xl border border-line bg-surface px-4 py-3 text-left hover:border-ink ${
          task.status === "needs_you" ? "border-l-4 border-l-clay" : ""
        }`}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted">
            {agent?.name} · {DUE_LABEL[task.due]}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(task.status)}`}>
            {STATUS_LABEL[task.status]}
          </span>
        </span>
        <span className="mt-1 block font-medium text-ink">{titleOf(task.brief)}</span>
        <span className="mt-1 block text-sm text-muted">{ago(task.updatedAt)}</span>
      </button>
    </li>
  );
}

function TaskDetail({
  task,
  agentName,
  note,
  onNote,
  onApprove,
  onSend,
}: {
  task: Task;
  agentName: string;
  note: string;
  onNote: (value: string) => void;
  onApprove: () => void;
  onSend: () => void;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Dialog.Title className="display text-2xl">{titleOf(task.brief)}</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted">
            {agentName} · {STATUS_LABEL[task.status]} · {DUE_LABEL[task.due]} · {ago(task.updatedAt)}
          </Dialog.Description>
        </div>
        <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-lg border border-line" aria-label="Close">
          <X className="size-4" />
        </Dialog.Close>
      </div>
      {task.brief.length > 88 ? <p className="mt-4 text-ink">{task.brief}</p> : null}
      {task.result ? (
        <p className="mt-4 rounded-lg bg-bg px-4 py-3 text-ink">{task.result}</p>
      ) : (
        <p className="mt-4 text-muted">
          {task.status === "working"
            ? `${agentName} is still on the first pass. It will land here when it is ready for you.`
            : task.status === "queued"
              ? "This is waiting. It starts when the helper is free and not paused."
              : "Finished work stays here so you can look back."}
        </p>
      )}
      {task.status === "needs_you" || task.status === "working" || task.status === "queued" ? (
        <div className="mt-4">
          <label htmlFor="note" className="text-sm font-semibold">
            Note back to {agentName}
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(event) => onNote(event.target.value)}
            rows={3}
            placeholder="Example: Make it shorter, and skip the pricing."
            className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-3 outline-none focus:border-clay"
          />
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            {task.status === "needs_you" ? (
              <button type="button" className="h-11 rounded-lg bg-moss px-4 text-sm font-semibold text-surface" onClick={onApprove}>
                Approve
              </button>
            ) : null}
            <button
              type="button"
              className="h-11 rounded-lg bg-ink px-4 text-sm font-semibold text-bg disabled:opacity-40"
              disabled={!note.trim()}
              onClick={onSend}
            >
              Send back
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
