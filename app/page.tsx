import Link from "next/link";
import Sidebar from "./components/Sidebar";
import { Plus, Zap, ToggleRight } from "lucide-react";

const SAMPLE_FLOWS = [
  { name: "New ticket – Slack alert", trigger: "Ticket", status: true, updated: "2 hours ago" },
  { name: "High priority escalation", trigger: "Ticket", status: true, updated: "Yesterday" },
  { name: "SLA breach warning", trigger: "Ticket", status: false, updated: "3 days ago" },
  { name: "Auto-close resolved tickets", trigger: "Ticket", status: true, updated: "1 week ago" },
];

export default function FlowsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto" style={{ background: "var(--grid-bg)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 bg-white border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Flows</h1>
          </div>
          <Link
            href="/flows/configure-flow?name=New+flow"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            <Plus size={15} />
            New flow
          </Link>
        </div>

        {/* Flow list */}
        <div className="px-8 py-6">
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left" style={{ borderColor: "var(--border)" }}>
                  <th className="px-5 py-3 font-medium text-gray-500 text-xs">NAME</th>
                  <th className="px-5 py-3 font-medium text-gray-500 text-xs">TRIGGER</th>
                  <th className="px-5 py-3 font-medium text-gray-500 text-xs">STATUS</th>
                  <th className="px-5 py-3 font-medium text-gray-500 text-xs">UPDATED</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {SAMPLE_FLOWS.map((flow) => (
                  <tr key={flow.name} className="border-b last:border-0 hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--border)" }}>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/flows/configure-flow?name=${encodeURIComponent(flow.name)}`}
                        className="font-medium text-gray-800 hover:underline"
                        style={{ textDecorationColor: "var(--primary)" }}
                      >
                        {flow.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <Zap size={13} style={{ color: "var(--primary)" }} />
                        {flow.trigger}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full w-fit"
                        style={{
                          background: flow.status ? "var(--primary-light)" : "#f3f4f6",
                          color: flow.status ? "var(--primary)" : "#6b7280",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: flow.status ? "var(--primary)" : "#9ca3af" }} />
                        {flow.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{flow.updated}</td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/flows/configure-flow?name=${encodeURIComponent(flow.name)}`}
                        className="text-xs font-medium px-3 py-1.5 rounded-md border transition-colors hover:bg-gray-50"
                        style={{ borderColor: "var(--border)", color: "var(--primary)" }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
