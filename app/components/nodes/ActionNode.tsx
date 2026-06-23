"use client";

import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { Trash2, Info, Sparkles, ChevronDown, Bell, Zap } from "lucide-react";
import NodeAddButton, { type AddableNodeType } from "./NodeAddButton";

const TABS = ["Reply", "Note", "Priority", "Assign", "Status", "Actions", "AI Agent"] as const;
type Tab = (typeof TABS)[number];

// ── Priority ──────────────────────────────────────────────────────────────────
const PRIORITIES = [
  { label: "Priority 1 - Emergency Response", color: "#e05252" },
  { label: "Priority 2 - Quick Response",     color: "#d4882a" },
  { label: "Priority 3 - Normal Response",    color: "#e8c34a" },
  { label: "Priority 4 - Scheduled Maintenance", color: "#4a6fd4" },
];

function PriorityPicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-white"
        style={{ borderColor: "var(--border)", color: selected ? "#374151" : "#9ca3af" }}
      >
        {selected
          ? <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: PRIORITIES.find(p => p.label === selected)?.color }} />
              {selected}
            </span>
          : "Select a priority"}
        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20 overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {PRIORITIES.map((p) => (
            <button key={p.label} onClick={() => { setSelected(p.label); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="w-5 h-5 rounded-sm border flex-shrink-0" style={{ background: p.color, borderColor: "#e5e5e3" }} />
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Assign ────────────────────────────────────────────────────────────────────
const MEMBERS = [
  { initials: "AOM", label: "Assign on-call member", color: "#f4c5a0", text: "#7c4a1e" },
  { initials: "UM",  label: "Unassign member",        color: "#a8d8c8", text: "#1e5c47" },
  { initials: "RB",  label: "Ricky Balmaceda",        color: "#a8d8c8", text: "#1e5c47" },
  { initials: "AA",  label: "Abdul Akhmediv",         color: "#f4c5a0", text: "#7c4a1e" },
  { initials: "AW",  label: "Adam Willford",          color: "#c5d4f4", text: "#1e3a7c" },
  { initials: "JT",  label: "Jamie Torres",           color: "#d4c5f4", text: "#3a1e7c" },
];

function AssignPicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const sel = MEMBERS.find(m => m.label === selected);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-white"
        style={{ borderColor: "var(--border)", color: selected ? "#374151" : "#9ca3af" }}
      >
        {sel
          ? <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: sel.color, color: sel.text }}>{sel.initials}</span>
              {sel.label}
            </span>
          : "Select an assignee"}
        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20 overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {MEMBERS.map((m) => (
            <button key={m.label} onClick={() => { setSelected(m.label); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ background: selected === m.label ? "#f3f4f6" : undefined }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: m.color, color: m.text }}>{m.initials}</span>
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Status ────────────────────────────────────────────────────────────────────
const STATUSES = [
  { label: "In Progress (plan of action)", board: "Professional Services" },
  { label: "New (not responded)",          board: "Professional Services" },
  { label: "Closed (resolved)",            board: "Professional Services" },
  { label: "Assigned (responded)",         board: "Professional Services" },
  { label: "New",                          board: "Integration" },
  { label: "In Progress",                  board: "Integration" },
];

function StatusPicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const sel = selected !== null ? STATUSES[selected] : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-white"
        style={{ borderColor: "var(--border)", color: sel ? "#374151" : "#9ca3af" }}
      >
        {sel ? `Status: ${sel.label} | Board: ${sel.board}` : "Select a status"}
        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20 overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {STATUSES.map((s, i) => (
            <button key={i} onClick={() => { setSelected(i); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
              style={{ background: selected === i ? "#f3f4f6" : undefined }}>
              <span className="w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 text-base" style={{ borderColor: "#e5e5e3" }}>🔔</span>
              <span>Status: {s.label} <span className="text-gray-400">|</span> Board: {s.board}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Actions Panel ─────────────────────────────────────────────────────────────
const PSA_BOARDS = ["BoardIsmoil", "Help Desk", "Integration", "Procurement", "Professional Services", "Project"];
const PSA_SUBITEMS = ["Priority", "Board", "Assign", "Resource Teams", "Status"];

const MAGIC_ITEMS = [
  { label: "Auto Prioritize", hasChildren: false },
  { label: "Auto Categorize", hasChildren: false },
  { label: "Generate Title", hasChildren: false },
  { label: "Generate Recap Template", hasChildren: true },
];

type ActionsView =
  | { level: "root" }
  | { level: "psa" }
  | { level: "psa-sub"; sub: string }
  | { level: "magic" };

function ActionsRowIcon({ type }: { type: "psa" | "itglue" | "magic" }) {
  if (type === "psa") return (
    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#e6f7f1" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="#00BB99" strokeWidth="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="#00BB99" strokeWidth="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="#00BB99" strokeWidth="1.5"/><circle cx="11.5" cy="11.5" r="2.5" stroke="#00BB99" strokeWidth="1.5"/></svg>
    </span>
  );
  if (type === "itglue") return (
    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-black">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><path d="M2 2h4v10H2zM8 2h4v4H8z"/></svg>
    </span>
  );
  return (
    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#e6f7f1" }}>
      <Sparkles size={14} style={{ color: "#00BB99" }} />
    </span>
  );
}

function ActionsPanel() {
  const [view, setView] = useState<ActionsView>({ level: "root" });
  const [psaSelection, setPsaSelection] = useState<{ sub: string; value: string } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [magicSelection, setMagicSelection] = useState<string | null>(null);

  const back = () => {
    if (view.level === "psa-sub") { setView({ level: "psa" }); setExpanded(false); }
    else setView({ level: "root" });
  };

  const breadcrumb =
    view.level === "psa" ? "PSA" :
    view.level === "psa-sub" ? `PSA / ${(view as { level: "psa-sub"; sub: string }).sub}` :
    view.level === "magic" ? "Magic" : null;

  const getSubOptions = (sub: string) => {
    if (sub === "Priority") return PRIORITIES.map(p => p.label);
    if (sub === "Board") return PSA_BOARDS;
    if (sub === "Assign") return MEMBERS.map(m => m.label);
    if (sub === "Resource Teams") return ["Alex's Team", "Dispatch team members", "Support Team"];
    if (sub === "Status") return STATUSES.map(s => `${s.label} — ${s.board}`);
    return [];
  };

  const selectValue = (sub: string, value: string) => {
    setPsaSelection({ sub, value });
    setExpanded(false);
  };

  return (
    <div className="-mx-4 -mb-4">
      {/* Breadcrumb */}
      {breadcrumb && (
        <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
          <button onClick={back} style={{ color: "var(--primary)" }}>
            <ChevronDown size={14} className="-rotate-90" />
          </button>
          <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>{breadcrumb}</span>
        </div>
      )}

      {/* Root: PSA / ITGlue / Magic */}
      {view.level === "root" && (
        <div>
          {(["PSA", "ITGlue", "Magic"] as const).map((item) => (
            <button key={item} onClick={() => {
              if (item === "PSA") setView({ level: "psa" });
              if (item === "Magic") setView({ level: "magic" });
            }}
              className="w-full flex items-center gap-3 px-4 py-3 border-b text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--border)" }}>
              <ActionsRowIcon type={item === "PSA" ? "psa" : item === "ITGlue" ? "itglue" : "magic"} />
              <span className="flex-1 text-left font-medium">{item}</span>
              <ChevronDown size={14} className="text-gray-400 -rotate-90" />
            </button>
          ))}
        </div>
      )}

      {/* PSA sub-list */}
      {view.level === "psa" && (
        <div>
          {PSA_SUBITEMS.map((sub) => (
            <button key={sub} onClick={() => { setView({ level: "psa-sub", sub }); setExpanded(!psaSelection || psaSelection.sub !== sub); }}
              className="w-full flex items-center gap-3 px-4 py-3 border-b text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--border)" }}>
              <ActionsRowIcon type="psa" />
              <span className="flex-1 text-left font-medium">{sub}</span>
              {psaSelection?.sub === sub && <span className="text-xs text-gray-400 mr-1 truncate max-w-[120px]">{psaSelection.value}</span>}
              <ChevronDown size={14} className="text-gray-400 -rotate-90" />
            </button>
          ))}
        </div>
      )}

      {/* Magic sub-list */}
      {view.level === "magic" && (
        <div>
          {MAGIC_ITEMS.map((item) => (
            <button key={item.label}
              onClick={() => !item.hasChildren && setMagicSelection(s => s === item.label ? null : item.label)}
              className="w-full flex items-center gap-3 px-4 py-3 border-b text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--border)" }}>
              <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border" style={{ borderColor: "#e5e5e3", background: "white" }}>
                <Sparkles size={14} style={{ color: magicSelection === item.label ? "#00BB99" : "#9ca3af" }} />
              </span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.hasChildren
                ? <ChevronDown size={14} className="text-gray-400 -rotate-90" />
                : magicSelection === item.label && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="#00BB99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            </button>
          ))}
        </div>
      )}

      {/* PSA sub-option: selected (collapsed) or open list */}
      {view.level === "psa-sub" && (() => {
        const sub = (view as { level: "psa-sub"; sub: string }).sub;
        const currentVal = psaSelection?.sub === sub ? psaSelection.value : null;
        const opts = getSubOptions(sub);
        const showList = expanded || !currentVal;
        return (
          <div>
            {/* Selected / placeholder row */}
            <button
              onClick={() => setExpanded(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 border-b text-sm hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--border)", color: currentVal ? "#111827" : "#9ca3af" }}>
              <span className="font-medium">{currentVal ?? `Select a ${sub.toLowerCase()}`}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${showList ? "rotate-180" : ""}`} />
            </button>
            {/* Options list */}
            {showList && opts.map((opt) => (
              <button key={opt} onClick={() => selectValue(sub, opt)}
                className="w-full flex items-center px-4 py-3 border-b text-sm text-left hover:bg-gray-50 transition-colors"
                style={{
                  borderColor: "var(--border)",
                  background: currentVal === opt ? "#f0fdf9" : undefined,
                  color: currentVal === opt ? "var(--primary)" : "#111827",
                  fontWeight: currentVal === opt ? 500 : undefined,
                }}>
                {opt}
              </button>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ── ActionNode ────────────────────────────────────────────────────────────────
export default function ActionNode({ id, data }: {
  id: string;
  data: { onDelete?: (id: string) => void; onAdd?: (id: string, type: AddableNodeType) => void; initialTab?: Tab };
}) {
  const [tab, setTab] = useState<Tab>(data.initialTab ?? "Reply");
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");
  const [agentPrompt, setAgentPrompt] = useState("");

  return (
    <div className="relative bg-white rounded-xl border shadow-sm w-[480px] overflow-visible" style={{ borderColor: "var(--border)" }}>
      <Handle type="target" position={Position.Top} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-700">Action</span>
            <Info size={13} className="text-gray-400" />
          </div>
          <button onClick={() => data.onDelete?.(id)} className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-3 overflow-x-auto" style={{ borderColor: "var(--border)" }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium border-b-2 transition-colors -mb-px whitespace-nowrap flex-shrink-0"
              style={{
                paddingRight: t === "AI Agent" ? 20 : undefined,
                borderBottomColor: tab === t ? (t === "AI Agent" ? "#8b5cf6" : "var(--primary)") : "transparent",
                color: tab === t ? (t === "AI Agent" ? "#8b5cf6" : "var(--primary)") : "#6b7280",
              }}>
              {t === "Actions" && <Zap size={11} />}
              {t === "AI Agent" && <Sparkles size={11} />}
              {t}
            </button>
          ))}
        </div>

        {/* Reply */}
        {tab === "Reply" && (
          <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4}
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="Set a custom message the bot will reply when this flow is triggered."
              className="nodrag w-full text-sm text-gray-600 outline-none resize-none placeholder:text-gray-300 block" />
          </div>
        )}

        {/* Note — cream background */}
        {tab === "Note" && (
          <div className="rounded-lg p-3 -mx-1" style={{ background: "#fdf8ec" }}>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="Display an internal note when this flow is triggered."
              className="nodrag w-full text-sm text-gray-600 outline-none resize-none placeholder:text-gray-300 block"
              style={{ background: "transparent" }} />
          </div>
        )}

        {/* Priority */}
        {tab === "Priority" && <PriorityPicker />}

        {/* Assign */}
        {tab === "Assign" && <AssignPicker />}

        {/* Status */}
        {tab === "Status" && <StatusPicker />}

        {/* Actions */}
        {tab === "Actions" && <ActionsPanel />}

        {/* AI Agent */}
        {tab === "AI Agent" && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={12} style={{ color: "#8b5cf6" }} />
              <span className="text-xs font-medium" style={{ color: "#8b5cf6" }}>Agent instructions</span>
            </div>
            <div className="rounded-lg border p-1" style={{ borderColor: "#c4b5fd" }}>
              <div className="flex flex-wrap gap-2 p-2 rounded-md" style={{ background: "rgba(139, 92, 246, 0.07)" }}>
                {[
                  { label: "Follow up",     text: "Check if this ticket has been open for more than 24 hours without a response. If so, send a friendly follow-up message to the customer and flag it for the on-call agent." },
                  { label: "Schedule time", text: "Review the ticket and identify the best time to schedule a call or meeting with the customer based on their timezone and the urgency of the issue." },
                  { label: "Route issue",   text: "Analyze the ticket content and automatically route it to the most appropriate team or agent based on the issue type, priority, and current workload." },
                ].map(({ label, text }) => (
                  <button key={label} onClick={() => setAgentPrompt(text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-white transition-colors cursor-pointer hover:border-purple-400 hover:bg-purple-50"
                    style={{ borderColor: "#c4b5fd", color: "#7c3aed" }}>
                    <Sparkles size={11} style={{ color: "#8b5cf6" }} />
                    {label}
                  </button>
                ))}
              </div>
              <textarea value={agentPrompt} onChange={(e) => setAgentPrompt(e.target.value)} rows={4}
                onMouseDown={(e) => e.stopPropagation()}
                placeholder="e.g. Analyze the ticket and determine if it can be auto-resolved. If the issue is a password reset, resolve it automatically. Otherwise escalate to a human agent."
                className="nodrag w-full text-sm text-gray-600 outline-none resize-none px-3 py-2.5 placeholder:text-gray-300 block bg-white" />
            </div>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      {data.onAdd && <NodeAddButton nodeId={id} onAdd={data.onAdd} />}
    </div>
  );
}
