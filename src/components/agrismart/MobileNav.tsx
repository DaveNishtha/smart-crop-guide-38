import { Link, useMatchRoute } from "@tanstack/react-router";
import { LayoutDashboard, Leaf, Sprout, type LucideIcon } from "lucide-react";

const items: { to: string; icon: LucideIcon; label: string }[] = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/diagnosis", icon: Leaf, label: "Diagnosis" },
  { to: "/crop-recommendation", icon: Sprout, label: "Crops" },
];

function MobileNavItem({ to, icon: Icon, label }: { to: string; icon: LucideIcon; label: string }) {
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to, fuzzy: true });

  return (
    <Link
      to={to}
      className={`flex-1 flex flex-col items-center py-2 gap-1 text-xs font-medium transition-colors ${
        isActive ? "text-agri-primary" : "text-agri-muted"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}

export default function MobileNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex border-t border-agri-border agri-glass"
    >
      {items.map(({ to, icon, label }) => (
        <MobileNavItem key={to} to={to} icon={icon} label={label} />
      ))}
    </nav>
  );
}
