"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import FlowCanvas from "@/app/components/FlowCanvas";

export default function FlowEditor({ name }: { name: string }) {
  const [isOn, setIsOn] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-3 bg-white border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-base font-semibold text-gray-900">{name}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* ON/OFF Toggle */}
            <button
              onClick={() => setIsOn((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors"
              style={{
                borderColor: isOn ? "var(--primary)" : "var(--border)",
                color: isOn ? "var(--primary)" : "#6b7280",
                background: isOn ? "var(--primary-light)" : "white",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: isOn ? "var(--primary)" : "#9ca3af" }}
              />
              {isOn ? "ON" : "OFF"}
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-all"
              style={{ background: "var(--primary)" }}
            >
              <Save size={14} />
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 overflow-hidden">
          <FlowCanvas />
        </div>
      </div>
    </div>
  );
}
