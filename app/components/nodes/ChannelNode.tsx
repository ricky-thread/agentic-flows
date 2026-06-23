"use client";

import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Trash2, ChevronDown } from "lucide-react";
import NodeAddButton, { type AddableNodeType } from "./NodeAddButton";

export default function ChannelNode({ id, data }: {
  id: string;
  data: { onDelete?: (id: string) => void; onAdd?: (id: string, type: AddableNodeType) => void };
}) {
  const [channel, setChannel] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [sendNote, setSendNote] = useState(false);

  return (
    <div className="relative bg-white rounded-xl border shadow-sm w-[340px]" style={{ borderColor: "var(--border)" }}>
      <Handle type="target" position={Position.Top} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Channel</span>
          <button onClick={() => data.onDelete?.(id)} className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mb-3" style={{ borderColor: "var(--border)" }}>
          <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.667 5C15.004 5 13.333 6.671 13.333 8.333c0 1.663 1.671 3.334 3.334 3.334h3.333V8.333C20 6.671 18.33 5 16.667 5z" fill="#E01E5A"/>
            <path d="M16.667 13.333H8.333C6.67 13.333 5 15.004 5 16.667c0 1.662 1.67 3.333 3.333 3.333h8.334c1.663 0 3.333-1.671 3.333-3.333 0-1.663-1.67-3.334-3.333-3.334z" fill="#E01E5A"/>
            <path d="M35 16.667C35 15.004 33.329 13.333 31.667 13.333c-1.663 0-3.334 1.671-3.334 3.334v3.333h3.334C33.329 20 35 18.33 35 16.667z" fill="#2EB67D"/>
            <path d="M26.667 16.667V8.333C26.667 6.671 25.004 5 23.333 5c-1.662 0-3.333 1.671-3.333 3.333v8.334c0 1.663 1.671 3.333 3.333 3.333 1.671 0 3.334-1.67 3.334-3.333z" fill="#2EB67D"/>
            <path d="M23.333 35c1.662 0 3.334-1.671 3.334-3.333 0-1.663-1.672-3.334-3.334-3.334h-3.333v3.334C20 33.329 21.671 35 23.333 35z" fill="#ECB22E"/>
            <path d="M23.333 26.667H31.667C33.33 26.667 35 24.996 35 23.333c0-1.662-1.67-3.333-3.333-3.333H23.333C21.67 20 20 21.671 20 23.333c0 1.663 1.67 3.334 3.333 3.334z" fill="#ECB22E"/>
            <path d="M5 23.333C5 24.996 6.671 26.667 8.333 26.667c1.663 0 3.334-1.671 3.334-3.334V20H8.333C6.671 20 5 21.671 5 23.333z" fill="#36C5F0"/>
            <path d="M13.333 23.333V31.667C13.333 33.329 15.004 35 16.667 35c1.662 0 3.333-1.671 3.333-3.333V23.333C20 21.671 18.33 20 16.667 20c-1.663 0-3.334 1.671-3.334 3.333z" fill="#36C5F0"/>
          </svg>
          <input value={channel} onChange={(e) => setChannel(e.target.value)}
            placeholder="Start typing channel name"
            className="flex-1 text-sm text-gray-500 outline-none" />
          <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={createNew} onChange={(e) => setCreateNew(e.target.checked)} className="w-3.5 h-3.5 rounded accent-[#0EA472]" />
            Create a new channel for each ticket
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={sendNote} onChange={(e) => setSendNote(e.target.checked)} className="w-3.5 h-3.5 rounded accent-[#0EA472]" />
            Send note as a message in channel ticket
          </label>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      {data.onAdd && <NodeAddButton nodeId={id} onAdd={data.onAdd} />}
    </div>
  );
}
