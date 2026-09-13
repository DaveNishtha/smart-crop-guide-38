import { Link, useMatchRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, Leaf, Sprout, ChevronLeft, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, type TRANSLATIONS } from "../../context/LanguageContext";
import { useState } from "react";

type NavKey = keyof (typeof TRANSLATIONS)["en"];

const navItems: { to: string; icon: LucideIcon; key: NavKey }[] = [
  { to: "/dashboard", icon: LayoutDashboard, key: "home" },
  { to: "/diagnosis", icon: Leaf, key: "cropDiagnosis" },
  { to: "/crop-recommendation", icon: Sprout, key: "cropRecommendation" },
];

function NavItem({ to, icon: Icon, label, collapsed }: { to: string; icon: LucideIcon; label: string; collapsed: boolean }) {
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to, fuzzy: true });

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150 group ${
        isActive
          ? "bg-green-600 text-white"
          : "text-green-200 hover:bg-green-800 hover:text-white"
      }`}
      title={collapsed ? label : undefined}
    >
      <Icon size={18} className="flex-shrink-0" />
      {!collapsed && (
        <span className="text-sm font-medium truncate">{label}</span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300"
      style={{
        width: collapsed ? 68 : 240,
        background: "#14532D",
        borderRight: "1px solid #166534",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-green-800">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "#2F7D32" }}>
          <Leaf size={16} color="white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm tracking-wide text-white leading-tight">
            AGRISMART<br />
            <span style={{ color: "#86efac" }}>AI</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map(({ to, icon, key }) => (
          <NavItem key={to} to={to} icon={icon} label={t[key]} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-green-800 text-green-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
