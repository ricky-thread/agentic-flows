"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Plus, Zap, Sparkles, Filter, MessageSquare } from "lucide-react";

export type AddableNodeType = "action" | "agent" | "filter" | "channel";

const OPTIONS: { type: AddableNodeType; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  { type: "filter",  label: "Add filters", icon: <Filter size={12} />,       color: "#374151", bg: "#f3f4f6" },
  { type: "channel", label: "Channel",     icon: <MessageSquare size={12} />, color: "#374151", bg: "#f3f4f6" },
  { type: "action",  label: "Action",      icon: <Zap size={12} />,          color: "#00BB99", bg: "#e6f7f1" },
  { type: "agent",   label: "AI Agent",    icon: <Sparkles size={12} />,     color: "#8b5cf6", bg: "#f3e8ff" },
];

export default function NodeAddButton({
  nodeId,
  onAdd,
}: {
  nodeId: string;
  onAdd: (fromId: string, type: AddableNodeType) => void;
}) {
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const updatePos = useCallback(() => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPopoverPos({ x: r.left + r.width / 2, y: r.bottom + 8 });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePos();
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!btnRef.current?.contains(target)) {
        // check if click is inside the portal popover
        const portal = document.getElementById("node-add-popover");
        if (!portal?.contains(target)) setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, updatePos]);

  const pick = (type: AddableNodeType) => {
    setOpen(false);
    onAdd(nodeId, type);
  };

  const popover = open && typeof window !== "undefined"
    ? createPortal(
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 9998 }}
            onMouseDown={() => setOpen(false)}
          />
          <div
            id="node-add-popover"
            className="bg-white rounded-xl border shadow-xl overflow-hidden w-48"
            style={{
              position: "fixed",
              left: popoverPos.x - 96,
              top: popoverPos.y,
              zIndex: 9999,
              borderColor: "#e5e5e3",
            }}
          >
          <p className="text-[10px] font-semibold text-gray-400 px-3 pt-2.5 pb-1 uppercase tracking-wider">
            Add step
          </p>
          {OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onMouseDown={(e) => { e.stopPropagation(); pick(opt.type); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: opt.bg, color: opt.color }}
              >
                {opt.icon}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      <div
        className="absolute left-1/2 -translate-x-1/2 nodrag nopan"
        style={{ bottom: -20, zIndex: 10 }}
      >
        <button
          ref={btnRef}
          onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
          className="w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110 active:scale-95"
          style={{ background: "#00BB99", color: "white" }}
          title="Add next step"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
      {popover}
    </>
  );
}
