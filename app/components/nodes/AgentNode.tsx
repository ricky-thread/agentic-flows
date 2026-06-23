"use client";

import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Trash2, Sparkles, GitBranch, Plus } from "lucide-react";
import NodeAddButton, { type AddableNodeType } from "./NodeAddButton";

type Branch = { label: string; condition: string };

export default function AgentNode({ id, data }: {
  id: string;
  data: { onDelete?: (id: string) => void; onAdd?: (id: string, type: AddableNodeType) => void };
}) {
  const [prompt, setPrompt] = useState("");
  const [branches, setBranches] = useState<Branch[]>([
    { label: "If resolved", condition: "Agent resolves the ticket" },
    { label: "If escalated", condition: "Agent needs human review" },
  ]);

  const addBranch = () =>
    setBranches((prev) => [...prev, { label: `Branch ${prev.length + 1}`, condition: "" }]);

  return (
    <div className="relative bg-white rounded-xl border-2 shadow-sm w-[380px]" style={{ borderColor: "#8b5cf6" }}>
      <Handle type="target" position={Position.Top} className="!bg-violet-400 !w-2 !h-2 !border-0" />
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#8b5cf6" }}>
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">AI Agent</span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full text-white" style={{ background: "#8b5cf6" }}>BETA</span>
          </div>
          <button onClick={() => data.onDelete?.(id)} className="text-red-400 hover:text-red-600 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Agent instructions</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4}
            placeholder="e.g. Analyze the ticket and determine if it can be auto-resolved..."
            className="w-full text-sm text-gray-600 outline-none resize-none border rounded-lg px-3 py-2.5 placeholder:text-gray-300 focus:ring-1"
            style={{ borderColor: "#c4b5fd", "--tw-ring-color": "#8b5cf6" } as React.CSSProperties} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <GitBranch size={13} className="text-violet-500" />
            <span className="text-xs font-medium text-gray-600">Branches</span>
          </div>
          <div className="space-y-2">
            {branches.map((branch, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: i === 0 ? "#10b981" : i === 1 ? "#f59e0b" : "#6b7280" }} />
                <input value={branch.label}
                  onChange={(e) => { const n = [...branches]; n[i] = { ...n[i], label: e.target.value }; setBranches(n); }}
                  className="border rounded px-2 py-1 text-xs text-gray-700 w-28 bg-white" style={{ borderColor: "var(--border)" }} />
                <input value={branch.condition}
                  onChange={(e) => { const n = [...branches]; n[i] = { ...n[i], condition: e.target.value }; setBranches(n); }}
                  placeholder="Condition…"
                  className="border rounded px-2 py-1 text-xs text-gray-500 flex-1 bg-white" style={{ borderColor: "var(--border)" }} />
              </div>
            ))}
          </div>
          <button onClick={addBranch} className="mt-2 flex items-center gap-1 text-xs font-medium" style={{ color: "#8b5cf6" }}>
            <Plus size={12} /> Add branch
          </button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-violet-400 !w-2 !h-2 !border-0" />
      {data.onAdd && <NodeAddButton nodeId={id} onAdd={data.onAdd} />}
    </div>
  );
}
