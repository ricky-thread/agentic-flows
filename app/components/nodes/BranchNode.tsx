"use client";

import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { Plus, Zap, Sparkles } from "lucide-react";

type AddNodeType = "action" | "agent";

export default function BranchNode({
  id,
  data,
}: {
  id: string;
  data: { onAdd?: (fromId: string, type: AddNodeType, side: "left" | "right") => void };
}) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const pick = (type: AddNodeType) => {
    setOpen(false);
    data.onAdd?.(id, type, "right");
  };

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); }}
    >
      <Handle type="target" position={Position.Left} className="!bg-gray-300 !w-2 !h-2 !border-0" />

      {/* The node circle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm"
        style={{
          borderColor: hovered || open ? "var(--primary)" : "var(--border)",
          background: hovered || open ? "var(--primary-light)" : "white",
          color: hovered || open ? "var(--primary)" : "#9ca3af",
        }}
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>

      {/* Popover */}
      {open && (
        <div
          className="absolute left-12 top-1/2 -translate-y-1/2 bg-white rounded-xl border shadow-lg overflow-hidden z-50 w-44"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-[10px] font-semibold text-gray-400 px-3 pt-2.5 pb-1 uppercase tracking-wider">
            Add step
          </p>
          <button
            onClick={() => pick("action")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary-light)" }}>
              <Zap size={13} style={{ color: "var(--primary)" }} />
            </span>
            Action
          </button>
          <button
            onClick={() => pick("agent")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "#f3e8ff" }}>
              <Sparkles size={13} style={{ color: "#8b5cf6" }} />
            </span>
            AI Agent
          </button>
        </div>
      )}

      <Handle type="source" position={Position.Right} className="!bg-gray-300 !w-2 !h-2 !border-0" />
    </div>
  );
}
