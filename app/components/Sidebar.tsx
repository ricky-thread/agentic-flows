"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Zap,
  Bot,
  Brain,
  GitBranch,
  Map,
  MessageSquare,
  Phone,
  Users,
  Building2,
  ShieldCheck,
  BarChart2,
  MessageCircle,
  ChevronDown,
  Plus,
  HelpCircle,
  Inbox,
} from "lucide-react";

const navGroups = [
  {
    label: "MAGIC AI",
    items: [
      { label: "Assistive AI", icon: Bot, href: "#" },
      { label: "Magic Agents", icon: Brain, href: "#" },
      { label: "Intelligence", icon: Zap, href: "#" },
    ],
  },
  {
    label: "AUTOMATION",
    items: [
      { label: "Status Mapping", icon: GitBranch, href: "#" },
      { label: "Flows", icon: Map, href: "/", active: true },
      { label: "Auto-dispatch", icon: Zap, href: "#" },
    ],
  },
  {
    label: "COMMUNICATION",
    items: [
      { label: "Messenger", icon: MessageSquare, href: "#" },
      { label: "Voice", icon: Phone, href: "#" },
      { label: "Clients", icon: Users, href: "#" },
    ],
  },
  {
    label: "GENERAL",
    items: [
      { label: "Workspace", icon: Building2, href: "#" },
      { label: "SLAs", icon: Map, href: "#" },
      { label: "Plans & Licenses", icon: ShieldCheck, href: "#" },
      { label: "Members", icon: Users, href: "#" },
      { label: "Integrations", icon: GitBranch, href: "#" },
      { label: "Security Center", icon: ShieldCheck, href: "#" },
      { label: "Analytics", icon: BarChart2, href: "#" },
      { label: "Feedback", icon: MessageCircle, href: "#" },
    ],
  },
];

const teams = [
  { label: "Alex's Team", color: "#f97316" },
  { label: "Dispatch team", color: "#8b5cf6" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-[200px] min-w-[200px] h-full border-r overflow-y-auto"
      style={{ borderColor: "var(--sidebar-border)", background: "#FAF9F6" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "var(--primary)" }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800">Thread Production</span>
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-1 text-[10px] font-semibold tracking-wider text-gray-400">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.active || pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={clsx(
                        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                        isActive
                          ? "font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      )}
                      style={isActive ? { color: "var(--primary)", background: "var(--primary-light)" } : undefined}
                    >
                      <item.icon size={15} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Teams */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400">YOUR TEAMS</p>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus size={12} />
            </button>
          </div>
          <ul className="space-y-0.5">
            {teams.map((team) => (
              <li key={team.label}>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: team.color }}
                  />
                  {team.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t px-2 py-2 flex items-center justify-between" style={{ borderColor: "var(--sidebar-border)" }}>
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 w-full">
          <Inbox size={15} />
          Inbox
        </button>
        <button className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100">
          <HelpCircle size={15} />
        </button>
      </div>
    </aside>
  );
}
