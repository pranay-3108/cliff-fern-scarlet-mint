import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ArrowRight, o as Menu, t as X, u as Check } from "../_libs/lucide-react.mjs";
import { a as initialAgents, n as Mark, r as STATUS_LABEL, t as DUE_LABEL } from "./model-BS9nII4F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DUMdgS9U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		href: "#how",
		label: "How it works"
	},
	{
		href: "#team",
		label: "The team"
	},
	{
		href: "#questions",
		label: "Questions"
	}
];
var STEPS = [
	{
		n: "01",
		title: "Say the job in normal words",
		body: "No special format. Write it the way you would ask a colleague: what you need, and anything they should know."
	},
	{
		n: "02",
		title: "The right helper picks it up",
		body: "Research, writing, planning, and follow-ups go to different people. You can also choose who gets it."
	},
	{
		n: "03",
		title: "You only step in to decide",
		body: "When a first pass is ready, it waits for you. Approve it, or send a short note back. Nothing ships on its own."
	}
];
var QUESTIONS = [
	{
		q: "Do I need an account?",
		a: "No. This desk stays in your browser. Add tasks, approve work, pause a helper — it will still be here when you come back on this device."
	},
	{
		q: "Will it send emails or messages for me?",
		a: "No. Helpers prepare the work. You approve it. That is the whole point of a desk instead of a chat that just keeps going."
	},
	{
		q: "What if I only need one kind of help?",
		a: "Pause the others. A paused helper keeps their queue and does not start anything new until you turn them back on."
	},
	{
		q: "Can I start over?",
		a: "Yes. Inside the desk there is a quiet “Start fresh” control that puts the sample team back. Your browser copy is the only copy."
	}
];
var PREVIEW = [
	{
		who: "Mira",
		role: "Research",
		title: "Which notes app is easiest for a small team?",
		status: "needs_you"
	},
	{
		who: "Jules",
		role: "Writing",
		title: "A kind reply about the slipped launch",
		status: "working"
	},
	{
		who: "Theo",
		role: "Planning",
		title: "Monday in five lines, afternoon kept free",
		status: "queued"
	}
];
function statusClass(status) {
	if (status === "needs_you") return "bg-clay-soft text-clay";
	if (status === "working") return "bg-moss-soft text-moss";
	if (status === "done") return "bg-bg text-ink";
	return "bg-bg text-muted";
}
function LandingPage() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const team = initialAgents();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-ink",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display text-xl",
								children: "AgentOS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-7 text-sm font-medium text-muted md:flex",
							"aria-label": "Page",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.href,
								className: "hover:text-ink",
								children: item.label
							}, item.href))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk",
								search: {
									view: "today",
									prefill: ""
								},
								className: "inline-flex h-11 items-center rounded-lg bg-clay px-4 text-sm font-semibold text-surface hover:opacity-90",
								children: "Open the desk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-ink md:hidden",
								"aria-expanded": open,
								"aria-label": open ? "Close menu" : "Open menu",
								onClick: () => setOpen((value) => !value),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "border-t border-line px-5 py-3 md:hidden",
					"aria-label": "Page",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "flex h-11 items-center text-ink",
						onClick: () => setOpen(false),
						children: item.label
					}, item.href))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold tracking-wide text-clay",
								children: "A simpler way to work with AI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display mt-3 text-4xl text-ink sm:text-6xl",
								children: "Tell them the job. Check back when it matters."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-lg text-muted",
								children: "AgentOS is one calm desk for research, writing, planning, and follow-ups. You say what you need. A helper does the first pass. You approve what is worth keeping."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/desk",
									search: {
										view: "today",
										prefill: ""
									},
									className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 font-semibold text-bg hover:opacity-90",
									children: ["Try the desk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									className: "inline-flex h-12 items-center justify-center rounded-lg border border-line bg-surface px-5 font-semibold text-ink",
									children: "See how it works"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "No account. Your desk stays on this device."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-4 sm:p-5",
							"aria-label": "A peek at the desk",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 px-1 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Today"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "display text-2xl",
										children: "2 things moving, 1 needs you"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-clay-soft px-3 py-1 text-sm font-semibold text-clay",
										children: "Live sample"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: PREVIEW.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-lg border border-line bg-bg px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted",
												children: [
													item.who,
													" · ",
													item.role
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(item.status)}`,
												children: STATUS_LABEL[item.status]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-medium text-ink",
											children: item.title
										})]
									}, item.title))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "px-1 pt-4 text-sm text-muted",
									children: [
										"Due labels like “",
										DUE_LABEL.today,
										"” stay in plain language."
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-y border-line bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3",
							children: [
								["Ask like a person", "A sentence is enough. Example chips show the kind of job that works well."],
								["See who has it", "Every task names a helper and a status you can read without a legend."],
								["Approve before it counts", "Finished means you said so. Sending a note back is one field, not a new chat."]
							].map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-5 text-moss",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display mt-3 text-2xl",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-muted",
									children: body
								})
							] }, title))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "how",
						className: "mx-auto max-w-6xl px-5 py-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display text-4xl",
								children: "How the desk works"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-muted",
								children: "Three steps. The same ones every time, so you never hunt for the next button."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-8 grid gap-4 lg:grid-cols-3",
								children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "panel p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "display text-3xl text-clay",
											children: step.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "display mt-4 text-2xl",
											children: step.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted",
											children: step.body
										})
									]
								}, step.n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "team",
						className: "bg-ink text-bg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-5 py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display text-4xl",
									children: "A small team, with obvious jobs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-2xl text-bg/75",
									children: "You do not manage a swarm. Four helpers cover the work most people actually hand off."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-8 grid gap-4 sm:grid-cols-2",
									children: team.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-xl border border-bg/15 p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-clay-soft",
												children: agent.role
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "display mt-1 text-3xl",
												children: agent.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-bg/80",
												children: agent.blurb
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-4 text-sm text-bg/60",
												children: ["Good for: ", agent.helps]
											})
										]
									}, agent.id))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-muted",
									children: "A long chat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display mt-2 text-3xl",
									children: "The work disappears up the thread"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 space-y-3 text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You scroll to remember who was doing what." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A half-finished draft looks the same as a finished one." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "There is no obvious place to say “yes, keep this.”" })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-clay",
									children: "The desk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display mt-2 text-3xl",
									children: "The work has a place and a status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 space-y-3 text-ink",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Today shows only what needs you and what is moving." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Each card says who, what, and whether it is waiting on you." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Approve and send-back sit on the work itself." })
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "questions",
						className: "mx-auto max-w-3xl px-5 pb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-4xl",
							children: "Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 divide-y divide-line border-y border-line",
							children: QUESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink",
									children: [
										item.q,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted group-open:hidden",
											"aria-hidden": "true",
											children: "+"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden text-muted group-open:inline",
											"aria-hidden": "true",
											children: "–"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-2xl text-muted",
									children: item.a
								})]
							}, item.q))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto max-w-6xl px-5 pb-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-clay px-6 py-10 text-surface sm:px-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display text-4xl",
									children: "Open the desk. A sample team is already there."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-xl text-surface/90",
									children: "Approve Mira’s notes comparison, or add a task of your own. It takes about a minute to see how it feels."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/desk",
									search: {
										view: "approvals",
										prefill: ""
									},
									className: "mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-surface px-5 font-semibold text-ink",
									children: ["Review what needs you", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7" }), "AgentOS"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A calm place to hand work to helpers and take it back." })]
				})
			})
		]
	});
}
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
