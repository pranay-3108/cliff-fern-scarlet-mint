import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as CirclePlay, f as ArrowLeft, i as SunMedium, l as CirclePause, n as Users, s as ListChecks, t as X, u as Check } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-DDgkonSf.mjs";
import { i as ago, n as Mark, o as titleOf, r as STATUS_LABEL, s as useDesk, t as DUE_LABEL } from "./model-BS9nII4F.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-CL1b3fVb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEWS = [
	{
		id: "today",
		label: "Today",
		icon: SunMedium
	},
	{
		id: "team",
		label: "Team",
		icon: Users
	},
	{
		id: "tasks",
		label: "Tasks",
		icon: ListChecks
	},
	{
		id: "approvals",
		label: "Approvals",
		icon: Check
	}
];
var EXAMPLES = [
	"Summarize the three risks in this week’s plan",
	"Draft a kind reply to a delayed client",
	"Plan my Monday in five lines"
];
function statusClass(status) {
	if (status === "needs_you") return "bg-clay-soft text-clay";
	if (status === "working") return "bg-moss-soft text-moss";
	if (status === "done") return "bg-bg text-muted";
	return "bg-bg text-muted";
}
function DeskApp({ view, prefill }) {
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
	const [brief, setBrief] = (0, import_react.useState)(prefill);
	const [agentId, setAgentId] = (0, import_react.useState)("auto");
	const [due, setDue] = (0, import_react.useState)("today");
	const [error, setError] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => tick(), 1e3);
		return () => window.clearInterval(id);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		if (!flash) return;
		const id = window.setTimeout(() => clearFlash(), 4200);
		return () => window.clearTimeout(id);
	}, [flash, clearFlash]);
	const waiting = tasks.filter((task) => task.status === "needs_you");
	const moving = tasks.filter((task) => task.status === "working" || task.status === "queued");
	const selected = tasks.find((task) => task.id === selectedId) ?? null;
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return tasks.filter((task) => {
			if (filter !== "all" && task.status !== filter) return false;
			if (!q) return true;
			const agent = agents.find((item) => item.id === task.agentId);
			return `${task.brief} ${agent?.name ?? ""}`.toLowerCase().includes(q);
		});
	}, [
		tasks,
		filter,
		query,
		agents
	]);
	function submit(event) {
		event?.preventDefault();
		const problem = addTask({
			brief,
			agentId,
			due
		});
		if (problem) {
			setError(problem);
			return;
		}
		setBrief("");
		setError(null);
		setDue("today");
	}
	function openTask(id) {
		setSelectedId(id);
		setNote("");
	}
	const copy = {
		today: {
			title: "Today",
			body: "What needs you, and what is already moving."
		},
		team: {
			title: "Team",
			body: "Four helpers. Pause anyone you do not need today."
		},
		tasks: {
			title: "Tasks",
			body: "Every job on the desk, in one list."
		},
		approvals: {
			title: "Approvals",
			body: "Nothing is finished until you say so."
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-24 md:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:grid md:grid-cols-[16rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden min-h-screen border-r border-line bg-surface md:flex md:flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex h-16 items-center gap-2.5 px-5 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display text-xl",
								children: "AgentOS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-1 flex-col gap-1 px-3",
							"aria-label": "Desk",
							children: VIEWS.map((item) => {
								const Icon = item.icon;
								const active = view === item.id;
								const count = item.id === "approvals" ? waiting.length : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/desk",
									search: {
										view: item.id,
										prefill: ""
									},
									"aria-current": active ? "page" : void 0,
									className: `flex h-11 items-center justify-between rounded-lg px-3 text-sm font-semibold ${active ? "bg-ink text-bg" : "text-ink hover:bg-bg"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
									}), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 text-xs ${active ? "bg-bg text-ink" : "bg-clay-soft text-clay"}`,
										children: count
									}) : null]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4",
							children: confirmReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-line bg-bg p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "Put the sample team back?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-10 flex-1 rounded-md bg-ink text-sm font-semibold text-bg",
										onClick: () => {
											reset();
											setConfirmReset(false);
										},
										children: "Yes, reset"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-10 flex-1 rounded-md border border-line bg-surface text-sm font-semibold",
										onClick: () => setConfirmReset(false),
										children: "Cancel"
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 w-full rounded-lg text-sm font-medium text-muted hover:text-ink",
								onClick: () => setConfirmReset(true),
								children: "Start fresh"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-bg/90 px-4 backdrop-blur md:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 md:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "display text-lg",
									children: "AgentOS"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-sm text-muted md:block",
								children: "Desk · saved on this device"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "inline-flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Home"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display text-4xl",
								children: copy[view].title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: copy[view].body
							}),
							flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rise mt-4 rounded-lg bg-moss-soft px-4 py-3 text-sm font-medium text-moss",
								role: "status",
								children: flash
							}) : null,
							view === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-6",
								children: [
									welcomed ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-ink",
											children: "Start with anything that needs a look. Or add a task in one sentence — the desk picks a helper."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-10 shrink-0 rounded-lg bg-ink px-3 text-sm font-semibold text-bg",
											onClick: dismissWelcome,
											children: "Got it"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskGroup, {
										title: "Needs a look",
										empty: "Nothing is waiting on you.",
										tasks: waiting,
										agents,
										onOpen: openTask
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										id: "composer",
										onSubmit: submit,
										className: "panel p-4 sm:p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "brief",
												className: "font-semibold",
												children: "What needs doing?"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted",
												children: "One sentence is enough. Add detail if it helps."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												id: "brief",
												value: brief,
												onChange: (event) => {
													setBrief(event.target.value);
													if (error) setError(null);
												},
												onKeyDown: (event) => {
													if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
														event.preventDefault();
														submit();
													}
												},
												rows: 3,
												placeholder: "Example: Draft a short update about Friday’s launch.",
												className: "mt-3 w-full resize-y rounded-lg border border-line bg-bg px-3 py-3 text-ink outline-none focus:border-clay"
											}),
											error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm font-medium text-clay",
												children: error
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
												className: "mt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
													className: "text-sm font-semibold",
													children: "Who should take it?"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex flex-wrap gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
														on: agentId === "auto",
														onClick: () => setAgentId("auto"),
														children: "Best fit"
													}), agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Choice, {
														on: agentId === agent.id,
														onClick: () => setAgentId(agent.id),
														children: [agent.name, agent.paused ? " · paused" : ""]
													}, agent.id))]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
												className: "mt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
													className: "text-sm font-semibold",
													children: "When?"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-2 flex flex-wrap gap-2",
													children: Object.keys(DUE_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
														on: due === key,
														onClick: () => setDue(key),
														children: DUE_LABEL[key]
													}, key))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-muted",
													children: "Ctrl or ⌘ Enter also adds it."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "h-12 rounded-lg bg-clay px-5 font-semibold text-surface",
													children: "Add to the desk"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 flex flex-wrap gap-2",
												children: EXAMPLES.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "rounded-full border border-line bg-bg px-3 py-2 text-left text-sm text-ink hover:border-ink",
													onClick: () => {
														setBrief(example);
														setError(null);
													},
													children: example
												}, example))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskGroup, {
										title: "Moving",
										empty: "Nothing is in progress. Add a task above.",
										tasks: moving,
										agents,
										onOpen: openTask
									})
								]
							}) : null,
							view === "team" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 grid gap-3",
								children: agents.map((agent) => {
									const current = tasks.find((task) => task.agentId === agent.id && (task.status === "working" || task.status === "needs_you"));
									const open = tasks.filter((task) => task.agentId === agent.id && task.status !== "done").length;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "panel p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-semibold text-clay",
														children: agent.role
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
														className: "display text-3xl",
														children: agent.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-muted",
														children: agent.blurb
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-3 py-1 text-sm font-semibold ${agent.paused ? "bg-bg text-muted" : "bg-moss-soft text-moss"}`,
													children: agent.paused ? "Paused" : "Available"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-4 text-sm text-ink",
												children: agent.paused ? "New tasks will wait in the queue." : current ? `Currently: ${titleOf(current.brief)}` : "Free right now."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-muted",
												children: [
													open,
													" open · good for ",
													agent.helps
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex flex-col gap-2 sm:flex-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-semibold",
													onClick: () => togglePause(agent.id),
													children: [agent.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePause, { className: "size-4" }), agent.paused ? "Resume" : "Pause"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "h-11 rounded-lg bg-ink px-4 text-sm font-semibold text-bg",
													onClick: () => {
														setAgentId(agent.id);
														navigate({
															to: "/desk",
															search: {
																view: "today",
																prefill: ""
															}
														});
														window.setTimeout(() => {
															document.getElementById("composer")?.scrollIntoView({
																behavior: "smooth",
																block: "start"
															});
														}, 50);
													},
													children: [
														"Give ",
														agent.name,
														" a task"
													]
												})]
											})
										]
									}, agent.id);
								})
							}) : null,
							view === "tasks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "relative block",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: "Search tasks"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: query,
												onChange: (event) => setQuery(event.target.value),
												placeholder: "Search by task or name",
												className: "h-12 w-full rounded-lg border border-line bg-surface pr-3 pl-10 outline-none focus:border-clay"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										role: "group",
										"aria-label": "Filter tasks",
										children: [
											"all",
											"needs_you",
											"working",
											"queued",
											"done"
										].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
											on: filter === key,
											onClick: () => setFilter(key),
											children: key === "all" ? "All" : STATUS_LABEL[key]
										}, key))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4",
										children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "rounded-xl border border-dashed border-line px-4 py-8 text-center text-muted",
											children: "No tasks match. Clear the search or add something new on Today."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-2",
											children: visible.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskButton, {
												task,
												agents,
												onOpen: openTask
											}, task.id))
										})
									})
								]
							}) : null,
							view === "approvals" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 space-y-3",
								children: waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel px-5 py-10 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "display text-3xl",
											children: "You’re clear"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted",
											children: "Nothing is waiting on a decision."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "mt-4 h-11 rounded-lg bg-ink px-4 text-sm font-semibold text-bg",
											onClick: () => void navigate({
												to: "/desk",
												search: {
													view: "today",
													prefill: ""
												}
											}),
											children: "Add a task"
										})
									]
								}) : waiting.map((task) => {
									const agent = agents.find((item) => item.id === task.agentId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "panel p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm font-semibold text-clay",
												children: [
													agent?.name,
													" · ",
													agent?.role
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "display mt-1 text-2xl",
												children: titleOf(task.brief)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-ink",
												children: task.result
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 text-sm text-muted",
												children: [
													DUE_LABEL[task.due],
													" · updated ",
													ago(task.updatedAt)
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex flex-col gap-2 sm:flex-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "h-11 rounded-lg bg-moss px-4 text-sm font-semibold text-surface",
													onClick: () => approve(task.id),
													children: "Approve"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold",
													onClick: () => openTask(task.id),
													children: "Send a note back"
												})]
											})
										]
									}, task.id);
								})
							}) : null
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface md:hidden",
				"aria-label": "Desk",
				children: VIEWS.map((item) => {
					const Icon = item.icon;
					const active = view === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/desk",
						search: {
							view: item.id,
							prefill: ""
						},
						"aria-current": active ? "page" : void 0,
						className: `flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${active ? "text-clay" : "text-muted"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }),
							item.label,
							item.id === "approvals" && waiting.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: [waiting.length, " waiting"]
							}) : null
						]
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selected,
				onOpenChange: (open) => !open && setSelectedId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-surface p-5 outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskDetail, {
						task: selected,
						agentName: agents.find((item) => item.id === selected.agentId)?.name ?? "Helper",
						note,
						onNote: setNote,
						onApprove: () => {
							approve(selected.id);
							setSelectedId(null);
						},
						onSend: () => {
							if (!note.trim()) return;
							sendBack(selected.id, note);
							setSelectedId(null);
						}
					}) : null
				})] })
			})
		]
	});
}
function Choice({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick,
		className: `h-10 rounded-full px-3 text-sm font-semibold ${on ? "bg-ink text-bg" : "border border-line bg-surface text-ink"}`,
		children
	});
}
function TaskGroup({ title, empty, tasks, agents, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-sm font-semibold tracking-wide text-muted",
		children: title
	}), tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 rounded-xl border border-dashed border-line px-4 py-6 text-muted",
		children: empty
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 space-y-2",
		children: tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskButton, {
			task,
			agents,
			onOpen
		}, task.id))
	})] });
}
function TaskButton({ task, agents, onOpen }) {
	const agent = agents.find((item) => item.id === task.agentId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onOpen(task.id),
		className: `w-full rounded-xl border border-line bg-surface px-4 py-3 text-left hover:border-ink ${task.status === "needs_you" ? "border-l-4 border-l-clay" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted",
					children: [
						agent?.name,
						" · ",
						DUE_LABEL[task.due]
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(task.status)}`,
					children: STATUS_LABEL[task.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block font-medium text-ink",
				children: titleOf(task.brief)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-muted",
				children: ago(task.updatedAt)
			})
		]
	}) });
}
function TaskDetail({ task, agentName, note, onNote, onApprove, onSend }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "display text-2xl",
				children: titleOf(task.brief)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
				className: "mt-1 text-sm text-muted",
				children: [
					agentName,
					" · ",
					STATUS_LABEL[task.status],
					" · ",
					DUE_LABEL[task.due],
					" · ",
					ago(task.updatedAt)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "inline-flex size-11 items-center justify-center rounded-lg border border-line",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}),
		task.brief.length > 88 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-ink",
			children: task.brief
		}) : null,
		task.result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 rounded-lg bg-bg px-4 py-3 text-ink",
			children: task.result
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: task.status === "working" ? `${agentName} is still on the first pass. It will land here when it is ready for you.` : task.status === "queued" ? "This is waiting. It starts when the helper is free and not paused." : "Finished work stays here so you can look back."
		}),
		task.status === "needs_you" || task.status === "working" || task.status === "queued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: "note",
					className: "text-sm font-semibold",
					children: ["Note back to ", agentName]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "note",
					value: note,
					onChange: (event) => onNote(event.target.value),
					rows: 3,
					placeholder: "Example: Make it shorter, and skip the pricing.",
					className: "mt-2 w-full rounded-lg border border-line bg-bg px-3 py-3 outline-none focus:border-clay"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2 sm:flex-row",
					children: [task.status === "needs_you" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-lg bg-moss px-4 text-sm font-semibold text-surface",
						onClick: onApprove,
						children: "Approve"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-lg bg-ink px-4 text-sm font-semibold text-bg disabled:opacity-40",
						disabled: !note.trim(),
						onClick: onSend,
						children: "Send back"
					})]
				})
			]
		}) : null
	] });
}
function DeskRoute() {
	const { view, prefill } = Route.useSearch();
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useDesk.persist.rehydrate();
		setReady(true);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-clay",
			children: "AgentOS"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "display mt-2 text-4xl",
			children: "Opening your desk…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskApp, {
		view,
		prefill
	});
}
//#endregion
export { DeskRoute as component };
