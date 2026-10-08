import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-BS9nII4F.js
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className = "size-9" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "40",
				height: "40",
				rx: "12",
				className: "fill-ink"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "11",
				width: "24",
				height: "16",
				rx: "3",
				className: "fill-bg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "29",
				width: "16",
				height: "2.5",
				rx: "1.25",
				className: "fill-clay"
			})
		]
	});
}
var STATUS_LABEL = {
	queued: "Up next",
	working: "On it",
	needs_you: "Needs a look",
	done: "Finished"
};
var DUE_LABEL = {
	today: "Today",
	week: "This week",
	later: "Whenever"
};
var HOUR = 36e5;
function initialAgents() {
	return [
		{
			id: "mira",
			name: "Mira",
			role: "Research",
			blurb: "Finds the useful facts and leaves out the noise.",
			helps: "Compare, look up, summarize",
			paused: false
		},
		{
			id: "jules",
			name: "Jules",
			role: "Writing",
			blurb: "Drafts emails, notes, and posts in a human voice.",
			helps: "Draft, rewrite, reply",
			paused: false
		},
		{
			id: "theo",
			name: "Theo",
			role: "Planning",
			blurb: "Turns a messy pile of work into a short plan.",
			helps: "Prioritize, schedule, decide",
			paused: false
		},
		{
			id: "nia",
			name: "Nia",
			role: "Follow-ups",
			blurb: "Remembers what you asked and prepares the nudge.",
			helps: "Remind, check in, chase",
			paused: false
		}
	];
}
function seedTasks(now) {
	return [
		{
			id: "t-notes",
			brief: "Compare three note-taking apps and tell me which is easiest for a small team.",
			agentId: "mira",
			status: "needs_you",
			due: "today",
			createdAt: now - 5 * HOUR,
			updatedAt: now - 21e5,
			workingSince: null,
			result: "Notion is the most familiar, Obsidian keeps files on your computer, and Apple Notes is the least to learn. For a small team that shares pages, Notion is the simplest start. I would skip Obsidian until someone actually wants local files.",
			feedback: null
		},
		{
			id: "t-reply",
			brief: "Draft a kind reply to a client whose launch slipped by a week.",
			agentId: "jules",
			status: "working",
			due: "today",
			createdAt: now - 72e4,
			updatedAt: now - 2e4,
			workingSince: now - 2e4,
			result: null,
			feedback: null
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
			feedback: null
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
			feedback: null
		}
	];
}
function pickAgent(brief) {
	const text = brief.toLowerCase();
	if (/(research|find|compare|source|look up|summar|which )/.test(text)) return "mira";
	if (/(write|draft|email|reply|post|rewrite|blog|announce)/.test(text)) return "jules";
	if (/(follow|remind|nudge|check in|ping|chase)/.test(text)) return "nia";
	return "theo";
}
function resultFor(agent, task) {
	const lead = task.feedback ? `Updated after your note (“${task.feedback}”). ` : "";
	if (agent.id === "mira") return `${lead}I pulled the useful points and left out the rest. Skim this, then approve it or tell me what to dig into.`;
	if (agent.id === "jules") return `${lead}Draft is short enough to send and sounds like a person. I left a spot where a personal detail would help.`;
	if (agent.id === "nia") return `${lead}The follow-up is written. Nothing goes out until you approve it.`;
	return `${lead}I ordered this by what unblocks the day. One decision is yours; the rest can wait.`;
}
function titleOf(brief) {
	const clean = brief.replace(/\s+/g, " ").trim();
	if (clean.length <= 88) return clean;
	return `${clean.slice(0, 85).trimEnd()}…`;
}
function ago(ts, now = Date.now()) {
	const mins = Math.max(1, Math.round((now - ts) / 6e4));
	if (mins < 60) return `${mins} min ago`;
	const hours = Math.round(mins / 60);
	if (hours < 24) return `${hours} hr ago`;
	const days = Math.round(hours / 24);
	return days === 1 ? "Yesterday" : `${days} days ago`;
}
function freshState() {
	const now = Date.now();
	return {
		agents: initialAgents(),
		tasks: seedTasks(now),
		welcomed: false,
		flash: null
	};
}
var useDesk = create()(persist((set, get) => ({
	...freshState(),
	addTask: ({ brief, agentId, due }) => {
		const text = brief.replace(/\s+/g, " ").trim();
		if (text.length < 4) return "Write the task in a sentence.";
		const chosen = agentId === "auto" ? pickAgent(text) : agentId;
		const agent = get().agents.find((item) => item.id === chosen);
		if (!agent) return "Pick someone on the team.";
		const now = Date.now();
		const status = agent.paused ? "queued" : "working";
		set({
			tasks: [{
				id: `t-${now.toString(36)}`,
				brief: text,
				agentId: chosen,
				status,
				due,
				createdAt: now,
				updatedAt: now,
				workingSince: status === "working" ? now : null,
				result: null,
				feedback: null
			}, ...get().tasks],
			flash: agent.paused ? `Saved for ${agent.name}. They are paused, so it waits.` : `${agent.name} picked it up.`
		});
		return null;
	},
	approve: (id) => {
		const now = Date.now();
		set({
			tasks: get().tasks.map((task) => task.id === id ? {
				...task,
				status: "done",
				updatedAt: now,
				workingSince: null
			} : task),
			flash: "Approved. Marked finished."
		});
	},
	sendBack: (id, note) => {
		const text = note.replace(/\s+/g, " ").trim();
		if (!text) return;
		const now = Date.now();
		const task = get().tasks.find((item) => item.id === id);
		const agent = get().agents.find((item) => item.id === task?.agentId);
		set({
			tasks: get().tasks.map((item) => item.id === id ? {
				...item,
				status: agent?.paused ? "queued" : "working",
				feedback: text,
				result: null,
				workingSince: agent?.paused ? null : now,
				updatedAt: now
			} : item),
			flash: agent ? `Sent back to ${agent.name}.` : "Sent back."
		});
	},
	togglePause: (id) => {
		const agent = get().agents.find((item) => item.id === id);
		if (!agent) return;
		const paused = !agent.paused;
		set({
			agents: get().agents.map((item) => item.id === id ? {
				...item,
				paused
			} : item),
			flash: paused ? `${agent.name} is paused. New work will wait.` : `${agent.name} is back.`
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
					status: "needs_you",
					workingSince: null,
					updatedAt: now,
					result: resultFor(agent, task)
				};
			}
			return task;
		});
		if (changed) set({ tasks });
	},
	reset: () => set(freshState())
}), {
	name: "agentos-desk-v1",
	skipHydration: true
}));
//#endregion
export { initialAgents as a, ago as i, Mark as n, titleOf as o, STATUS_LABEL as r, useDesk as s, DUE_LABEL as t };
