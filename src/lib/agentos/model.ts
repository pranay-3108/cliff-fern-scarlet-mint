import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AgentId = "mira" | "jules" | "theo" | "nia";
export type Due = "today" | "week" | "later";
export type Status = "queued" | "working" | "needs_you" | "done";
export type View = "today" | "team" | "tasks" | "approvals";

export type Agent = {
  id: AgentId;
  name: string;
  role: string;
  blurb: string;
  helps: string;
  paused: boolean;
};

export type Task = {
  id: string;
  brief: string;
  agentId: AgentId;
  status: Status;
  due: Due;
  createdAt: number;
  updatedAt: number;
  workingSince: number | null;
  result: string | null;
  feedback: string | null;
};

export const STATUS_LABEL: Record<Status, string> = {
  queued: "Up next",
  working: "On it",
  needs_you: "Needs a look",
  done: "Finished",
};

export const DUE_LABEL: Record<Due, string> = {
  today: "Today",
  week: "This week",
  later: "Whenever",
};

const HOUR = 60 * 60 * 1000;

export function initialAgents(): Agent[] {
  return [
    {
      id: "mira",
      name: "Mira",
      role: "Research",
      blurb: "Finds the useful facts and leaves out the noise.",
      helps: "Compare, look up, summarize",
      paused: false,
    },
    {
      id: "jules",
      name: "Jules",
      role: "Writing",
      blurb: "Drafts emails, notes, and posts in a human voice.",
      helps: "Draft, rewrite, reply",
      paused: false,
    },
    {
      id: "theo",
      name: "Theo",
      role: "Planning",
      blurb: "Turns a messy pile of work into a short plan.",
      helps: "Prioritize, schedule, decide",
      paused: false,
    },
    {
      id: "nia",
      name: "Nia",
      role: "Follow-ups",
      blurb: "Remembers what you asked and prepares the nudge.",
      helps: "Remind, check in, chase",
      paused: false,
    },
  ];
}

function seedTasks(now: number): Task[] {
  return [
    {
      id: "t-notes",
      brief: "Compare three note-taking apps and tell me which is easiest for a small team.",
      agentId: "mira",
      status: "needs_you",
      due: "today",
      createdAt: now - 5 * HOUR,
      updatedAt: now - 35 * 60 * 1000,
      workingSince: null,
      result:
        "Notion is the most familiar, Obsidian keeps files on your computer, and Apple Notes is the least to learn. For a small team that shares pages, Notion is the simplest start. I would skip Obsidian until someone actually wants local files.",
      feedback: null,
    },
    {
      id: "t-reply",
      brief: "Draft a kind reply to a client whose launch slipped by a week.",
      agentId: "jules",
      status: "working",
      due: "today",
      createdAt: now - 12 * 60 * 1000,
      updatedAt: now - 20 * 1000,
      workingSince: now - 20 * 1000,
      result: null,
      feedback: null,
    },
    {
      id: "t-monday",
      brief: "Plan Monday in five lines. Keep the afternoon free for deep work.",
      agentId: "theo",
      status: "queued",
      due: "week",
      createdAt: now - 2 * HOUR,
      updatedAt: now - 2 * HOUR,
      workingSince: null,
      result: null,
      feedback: null,
    },
    {
      id: "t-vendor",
      brief: "Follow up with the printer if the proofs have not arrived by Thursday.",
      agentId: "nia",
      status: "done",
      due: "week",
      createdAt: now - 26 * HOUR,
      updatedAt: now - 20 * HOUR,
      workingSince: null,
      result: "Nudge is ready and was marked finished. Nothing was sent on your behalf.",
      feedback: null,
    },
  ];
}

export function pickAgent(brief: string): AgentId {
  const text = brief.toLowerCase();
  if (/(research|find|compare|source|look up|summar|which )/.test(text)) return "mira";
  if (/(write|draft|email|reply|post|rewrite|blog|announce)/.test(text)) return "jules";
  if (/(follow|remind|nudge|check in|ping|chase)/.test(text)) return "nia";
  return "theo";
}

function resultFor(agent: Agent, task: Task): string {
  const lead = task.feedback
    ? `Updated after your note (“${task.feedback}”). `
    : "";
  if (agent.id === "mira") {
    return `${lead}I pulled the useful points and left out the rest. Skim this, then approve it or tell me what to dig into.`;
  }
  if (agent.id === "jules") {
    return `${lead}Draft is short enough to send and sounds like a person. I left a spot where a personal detail would help.`;
  }
  if (agent.id === "nia") {
    return `${lead}The follow-up is written. Nothing goes out until you approve it.`;
  }
  return `${lead}I ordered this by what unblocks the day. One decision is yours; the rest can wait.`;
}

export function titleOf(brief: string): string {
  const clean = brief.replace(/\s+/g, " ").trim();
  if (clean.length <= 88) return clean;
  return `${clean.slice(0, 85).trimEnd()}…`;
}

export function ago(ts: number, now = Date.now()): string {
  const mins = Math.max(1, Math.round((now - ts) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

type DeskState = {
  agents: Agent[];
  tasks: Task[];
  welcomed: boolean;
  flash: string | null;
  addTask: (input: { brief: string; agentId: AgentId | "auto"; due: Due }) => string | null;
  approve: (id: string) => void;
  sendBack: (id: string, note: string) => void;
  togglePause: (id: AgentId) => void;
  dismissWelcome: () => void;
  clearFlash: () => void;
  tick: () => void;
  reset: () => void;
};

function freshState() {
  const now = Date.now();
  return {
    agents: initialAgents(),
    tasks: seedTasks(now),
    welcomed: false,
    flash: null as string | null,
  };
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      ...freshState(),
      addTask: ({ brief, agentId, due }) => {
        const text = brief.replace(/\s+/g, " ").trim();
        if (text.length < 4) return "Write the task in a sentence.";
        const chosen = agentId === "auto" ? pickAgent(text) : agentId;
        const agent = get().agents.find((item) => item.id === chosen);
        if (!agent) return "Pick someone on the team.";
        const now = Date.now();
        const status: Status = agent.paused ? "queued" : "working";
        const task: Task = {
          id: `t-${now.toString(36)}`,
          brief: text,
          agentId: chosen,
          status,
          due,
          createdAt: now,
          updatedAt: now,
          workingSince: status === "working" ? now : null,
          result: null,
          feedback: null,
        };
        set({
          tasks: [task, ...get().tasks],
          flash: agent.paused
            ? `Saved for ${agent.name}. They are paused, so it waits.`
            : `${agent.name} picked it up.`,
        });
        return null;
      },
      approve: (id) => {
        const now = Date.now();
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, status: "done", updatedAt: now, workingSince: null } : task,
          ),
          flash: "Approved. Marked finished.",
        });
      },
      sendBack: (id, note) => {
        const text = note.replace(/\s+/g, " ").trim();
        if (!text) return;
        const now = Date.now();
        const task = get().tasks.find((item) => item.id === id);
        const agent = get().agents.find((item) => item.id === task?.agentId);
        set({
          tasks: get().tasks.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: agent?.paused ? "queued" : "working",
                  feedback: text,
                  result: null,
                  workingSince: agent?.paused ? null : now,
                  updatedAt: now,
                }
              : item,
          ),
          flash: agent ? `Sent back to ${agent.name}.` : "Sent back.",
        });
      },
      togglePause: (id) => {
        const agent = get().agents.find((item) => item.id === id);
        if (!agent) return;
        const paused = !agent.paused;
        set({
          agents: get().agents.map((item) => (item.id === id ? { ...item, paused } : item)),
          flash: paused ? `${agent.name} is paused. New work will wait.` : `${agent.name} is back.`,
        });
      },
      dismissWelcome: () => set({ welcomed: true }),
      clearFlash: () => set({ flash: null }),
      tick: () => {
        const now = Date.now();
        let changed = false;
        const tasks = get().tasks.map((task) => {
          if (task.status === "working" && task.workingSince && now - task.workingSince > 4500) {
            const agent = get().agents.find((item) => item.id === task.agentId);
            if (!agent) return task;
            changed = true;
            return {
              ...task,
              status: "needs_you" as const,
              workingSince: null,
              updatedAt: now,
              result: resultFor(agent, task),
            };
          }
          return task;
        });
        if (changed) set({ tasks });
      },
      reset: () => set(freshState()),
    }),
    {
      name: "agentos-desk-v1",
      skipHydration: true,
    },
  ),
);
