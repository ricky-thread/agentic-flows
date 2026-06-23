"use client";

import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { X, ChevronDown, Info, Trash2 } from "lucide-react";
import NodeAddButton, { type AddableNodeType } from "./NodeAddButton";

type Rule = { field: string; operator: string; value: string };
type GroupItem = { type: "rule"; rule: Rule } | { type: "group"; rules: Rule[] };

const FIELD_OPTIONS = [
  "Address Line 1", "Agreement", "Agreement Type", "Agreement Name",
  "Board", "Budget Hours", "City", "Companies", "Company Type",
  "Contact", "Contact Type", "Priority", "Status", "Source",
];

const OPERATOR_OPTIONS: Record<string, string[]> = {
  default: ["Like", "Not like", "Starts with", "Is blank", "Is not blank"],
  Board: ["=", "!="],
  Priority: ["=", "!=", "In", "Not in"],
  Status: ["=", "!="],
};

function RuleRow({ rule, isFirst, onChange, onRemove }: {
  rule: Rule; isFirst: boolean; onChange: (r: Rule) => void; onRemove: () => void;
}) {
  const ops = OPERATOR_OPTIONS[rule.field] ?? OPERATOR_OPTIONS.default;
  const noValue = rule.operator === "Is blank" || rule.operator === "Is not blank";
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium text-gray-500 w-9 flex-shrink-0 text-right">
        {isFirst ? "Where" : "AND"}
      </span>
      <select value={rule.field} onChange={(e) => onChange({ ...rule, field: e.target.value })}
        className="border rounded px-1.5 py-1 text-xs text-gray-700 bg-white flex-1 min-w-0"
        style={{ borderColor: "var(--border)" }}>
        {FIELD_OPTIONS.map((f) => <option key={f}>{f}</option>)}
      </select>
      <select value={rule.operator} onChange={(e) => onChange({ ...rule, operator: e.target.value })}
        className="border rounded px-1.5 py-1 text-xs text-gray-700 bg-white w-20 flex-shrink-0"
        style={{ borderColor: "var(--border)" }}>
        {ops.map((o) => <option key={o}>{o}</option>)}
      </select>
      {!noValue && (
        <input value={rule.value} onChange={(e) => onChange({ ...rule, value: e.target.value })}
          className="border rounded px-1.5 py-1 text-xs flex-1 min-w-0"
          style={{ borderColor: "var(--border)" }} />
      )}
      <button onClick={onRemove}
        className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-white"
        style={{ background: "var(--primary)" }}>
        <X size={9} />
      </button>
    </div>
  );
}

export default function FilterNode({ id, data }: {
  id: string;
  data: { label?: string; onDelete?: (id: string) => void; onAdd?: (id: string, type: AddableNodeType) => void };
}) {
  const [timezone, setTimezone] = useState("Eastern Time (ET)");
  const [items, setItems] = useState<GroupItem[]>([
    { type: "rule", rule: { field: "Address Line 1", operator: "Like", value: "" } },
  ]);

  const addRule = () =>
    setItems((prev) => [...prev, { type: "rule", rule: { field: "Address Line 1", operator: "Like", value: "" } }]);

  const addGroup = () =>
    setItems((prev) => [...prev, { type: "group", rules: [{ field: "Address Line 1", operator: "Like", value: "" }] }]);

  return (
    <div className="relative bg-white rounded-xl border shadow-sm w-[460px]" style={{ borderColor: "var(--border)" }}>
      <Handle type="target" position={Position.Top} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400 font-medium">{data.label ?? "Apply filters"}</p>
          <button onClick={() => data.onDelete?.(id)} className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2 mb-3" style={{ borderColor: "var(--border)" }}>
          <span className="text-sm text-gray-600 font-medium w-20 flex-shrink-0">Time zone</span>
          <input value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="Search..."
            className="flex-1 text-sm text-gray-400 outline-none" />
          <ChevronDown size={13} className="text-gray-400 flex-shrink-0" />
          <Info size={13} className="text-gray-400 flex-shrink-0" />
        </div>
        <div className="space-y-2">
          {items.map((item, i) => {
            if (item.type === "rule") {
              return (
                <RuleRow key={i} rule={item.rule} isFirst={i === 0}
                  onChange={(r) => setItems((p) => { const n = [...p]; n[i] = { type: "rule", rule: r }; return n; })}
                  onRemove={() => setItems((p) => p.filter((_, idx) => idx !== i))} />
              );
            }
            return (
              <div key={i} className="ml-9 border rounded p-2 space-y-1.5" style={{ borderColor: "var(--border)" }}>
                {item.rules.map((rule, ri) => (
                  <RuleRow key={ri} rule={rule} isFirst={ri === 0}
                    onChange={(r) => {
                      const rules = [...item.rules]; rules[ri] = r;
                      setItems((p) => { const n = [...p]; n[i] = { type: "group", rules }; return n; });
                    }}
                    onRemove={() => {
                      const rules = item.rules.filter((_, idx) => idx !== ri);
                      setItems((p) => { const n = [...p]; if (rules.length === 0) n.splice(i, 1); else n[i] = { type: "group", rules }; return n; });
                    }} />
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={addRule} className="px-3 py-1 rounded text-xs font-medium text-white" style={{ background: "var(--primary)" }}>+Rule</button>
          <button onClick={addGroup} className="px-3 py-1 rounded text-xs font-medium text-white" style={{ background: "var(--primary)" }}>+Group</button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      {data.onAdd && <NodeAddButton nodeId={id} onAdd={data.onAdd} />}
    </div>
  );
}
