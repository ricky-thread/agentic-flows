"use client";

import { Handle, Position } from "@xyflow/react";
import NodeAddButton, { type AddableNodeType } from "./NodeAddButton";

export default function TriggerNode({ id, data }: { id: string; data: { label: string; onAdd?: (id: string, type: AddableNodeType) => void } }) {
  return (
    <div className="relative bg-white rounded-xl border shadow-sm w-[340px]" style={{ borderColor: "var(--border)" }}>
      <div className="px-5 py-3">
        <p className="text-xs text-gray-400 font-medium mb-2">When a new</p>
        <div className="rounded-lg border px-4 py-3 text-sm font-medium text-gray-700" style={{ borderColor: "var(--border)" }}>
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2 !border-0" />
      {data.onAdd && <NodeAddButton nodeId={id} onAdd={data.onAdd} />}
    </div>
  );
}
