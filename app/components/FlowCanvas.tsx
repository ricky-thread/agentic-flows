"use client";

import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  PanOnScrollMode,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TriggerNode from "./nodes/TriggerNode";
import FilterNode from "./nodes/FilterNode";
import ChannelNode from "./nodes/ChannelNode";
import ActionNode from "./nodes/ActionNode";
import AgentNode from "./nodes/AgentNode";
import { type AddableNodeType } from "./nodes/NodeAddButton";

const nodeTypes = { trigger: TriggerNode, filter: FilterNode, channel: ChannelNode, action: ActionNode, agent: AgentNode };

const NODE_WIDTH:  Record<string, number> = { trigger: 340, filter: 460, channel: 340, action: 440, agent: 380 };
const NODE_HEIGHT: Record<string, number> = { trigger: 110, filter: 190, channel: 150, action: 160, agent: 200 };
const VERTICAL_GAP = 80;

export default function FlowCanvas() {
  // Use refs to always have current values inside callbacks
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const setNodesRef = useRef<ReturnType<typeof useNodesState>[1] | undefined>(undefined);
  const setEdgesRef = useRef<ReturnType<typeof useEdgesState>[1] | undefined>(undefined);

  const deleteNode = useCallback((id: string) => {
    setNodesRef.current?.((nds) => nds.filter((n) => n.id !== id));
    setEdgesRef.current?.((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  }, []);

  const makeData = useCallback(
    (type: string) =>
      type === "trigger"
        ? { label: "Ticket", onAdd: handleAdd }
        : { onDelete: deleteNode, onAdd: handleAdd },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deleteNode]
  );

  // eslint-disable-next-line prefer-const
  function handleAdd(fromId: string, type: AddableNodeType) {
    const nds = nodesRef.current;
    const origin = nds.find((n) => n.id === fromId);
    if (!origin) return;

    const newId = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const originW = NODE_WIDTH[origin.type ?? "action"] ?? 340;
    const newW = NODE_WIDTH[type] ?? 340;

    // Find direct children of the origin node
    const childIds = edgesRef.current.filter((e) => e.source === fromId).map((e) => e.target);
    const children = nds.filter((n) => childIds.includes(n.id));

    let x: number, y: number;
    if (children.length === 0) {
      // No existing children — place directly below, centered on origin
      x = origin.position.x + originW / 2 - newW / 2;
      y = origin.position.y + (NODE_HEIGHT[origin.type ?? "action"] ?? 200) + VERTICAL_GAP;
    } else {
      // Existing children — place at same Y as first child, 80px right of the rightmost child
      y = children[0].position.y;
      const rightmostEdge = Math.max(...children.map((n) => n.position.x + (NODE_WIDTH[n.type ?? "action"] ?? 340)));
      x = rightmostEdge + 80;
    }

    // "AI Agent" from the menu creates an Action node with the AI Agent tab pre-selected
    const resolvedType = type === "agent" ? "action" : type;
    const newNode: Node = {
      id: newId,
      type: resolvedType,
      position: { x, y },
      data: {
        onDelete: deleteNode,
        onAdd: handleAdd,
        ...(type === "agent" ? { initialTab: "AI Agent" } : {}),
      },
    };

    setNodesRef.current?.((prev) => [...prev, newNode]);
    setEdgesRef.current?.((eds) => [
      ...eds,
      { id: `e-${fromId}-${newId}`, source: fromId, target: newId, type: "smoothstep" },
    ]);
  }

  // Center X for each node = CX - width/2. CX=300, widths: trigger=340, filter=460, channel=340, action=440
  // Y positions: node tops spaced so gap between bottom of prev and top of next is ~80px
  // Approx heights: trigger~110, filter~190, channel~150, action~160
  const CX = 300;
  const initialNodes: Node[] = [
    { id: "trigger-1", type: "trigger", position: { x: CX - 170, y: 0   }, data: { label: "Ticket", onAdd: handleAdd }, deletable: false },
    { id: "filter-1",  type: "filter",  position: { x: CX - 230, y: 190 }, data: { onDelete: deleteNode, onAdd: handleAdd } },
    { id: "channel-1", type: "channel", position: { x: CX - 170, y: 460 }, data: { onDelete: deleteNode, onAdd: handleAdd } },
    { id: "action-1",  type: "action",  position: { x: CX - 220, y: 690 }, data: { onDelete: deleteNode, onAdd: handleAdd } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([
    { id: "e1-2", source: "trigger-1", target: "filter-1",  type: "smoothstep" },
    { id: "e2-3", source: "filter-1",  target: "channel-1", type: "smoothstep" },
    { id: "e3-4", source: "channel-1", target: "action-1",  type: "smoothstep" },
  ]);

  setNodesRef.current = setNodes;
  setEdgesRef.current = setEdges;
  nodesRef.current = nodes;
  edgesRef.current = edges;

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );

  return (
    <div className="relative w-full h-full" style={{ background: "#FAF9F6" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        panOnScroll
        panOnScrollSpeed={1.5}
        panOnScrollMode={PanOnScrollMode.Free}
        zoomOnPinch
        zoomOnScroll={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#b5b0a8" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
