import { TrendingUp, Droplets, Thermometer, CloudRain, Leaf, Sprout, Sun, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import Topbar from "@/components/agrismart/Topbar";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const healthData = [
  { day: "Mon", health: 72, moisture: 58 },
  { day: "Tue", health: 78, moisture: 62 },
  { day: "Wed", health: 75, moisture: 55 },
  { day: "Thu", health: 82, moisture: 70 },
  { day: "Fri", health: 80, moisture: 65 },
  { day: "Sat", health: 85, moisture: 68 },
  { day: "Sun", health: 88, moisture: 72 },
];

type Tone = "green" | "blue" | "amber" | "violet";

const metrics: {
  key: string; value: string; icon: typeof Leaf | typeof Sprout; change: string; tone: Tone; trend: "up" | "down" | "flat"; progress: number;
}[] = [
  { key: "farmHealth", value: "88%", icon: TrendingUp, change: "+3%", tone: "green", trend: "up", progress: 88 },
  { key: "cropHealth", value: "82%", icon: Leaf, change: "+5%", tone: "green", trend: "up", progress: 82 },
  { key: "soilMoisture", value: "68%", icon: Droplets, change: "-2%", tone: "blue", trend: "down", progress: 68 },
  { key: "temperature", value: "28°C", icon: Thermometer, change: "+1°C", tone: "amber", trend: "up", progress: 62 },
  { key: "rainProbability", value: "74%", icon: CloudRain, change: "High", tone: "violet", trend: "flat", progress: 74 },
  { key: "sustainabilityScore", value: "82", icon: Sprout, change: "Excellent", tone: "green", trend: "up", progress: 82 },
];

const TONES: Record<Tone, { fg: string; soft: string }> = {
  green: { fg: "text-agri-primary", soft: "bg-agri-primary-soft" },
  blue: { fg: "text-agri-info", soft: "bg-agri-info-soft" },
  amber: { fg: "text-agri-warn", soft: "bg-agri-warn-soft" },
  violet: { fg: "text-agri-violet", soft: "bg-agri-violet-soft" },
};

const BARS: Record<Tone, string> = {
  green: "from-agri-primary to-agri-primary-strong",
  blue: "from-agri-info to-agri-primary",
  amber: "from-agri-warn to-agri-danger",
  violet: "from-agri-violet to-agri-info",
};

const insights = [
  { icon: CloudRain, text: "Rain is likely within the next 24 hours.", action: "Consider delaying irrigation.", severity: "warning" },
  { icon: Leaf, text: "Tomato crops showing early signs of stress.", action: "Check moisture levels in Zone B.", severity: "alert" },
  { icon: TrendingUp, text: "Soil pH is optimal for current crops.", action: "No action required.", severity: "success" },
];

const SEVERITY = {
  success: { wrap: "bg-agri-primary-soft border-agri-primary/30", icon: "text-agri-primary" },
  warning: { wrap: "bg-agri-warn-soft border-agri-warn/30", icon: "text-agri-warn" },
  alert: { wrap: "bg-agri-danger-soft border-agri-danger/30", icon: "text-agri-danger" },
} as const;

const recentAnalyses = [
  { crop: "Tomato", result: "Early Blight", confidence: 91, date: "Today, 9:42 AM", status: "disease" },
  { crop: "Wheat", result: "Healthy", confidence: 96, date: "Yesterday, 3:15 PM", status: "healthy" },
  { crop: "Rice", result: "Leaf Spot", confidence: 84, date: "2 days ago", status: "disease" },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const grid = dark ? "oklch(0.34 0.03 155)" : "oklch(0.93 0.02 148)";
  const axis = dark ? "oklch(0.72 0.02 150)" : "oklch(0.56 0.02 150)";
  const green = dark ? "#4ade80" : "#2F7D32";
  const blue = dark ? "#60a5fa" : "#3b82f6";

  return (
    <div className="flex-1 overflow-y-auto bg-agri-bg">
      <Topbar />

      {/* Ambient agricultural gradient wash */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70"
          style={{
            background:
              "radial-gradient(60% 120% at 12% 0%, var(--agri-primary-soft) 0%, transparent 60%), radial-gradient(50% 100% at 90% 10%, var(--agri-info-soft) 0%, transparent 65%)",
          }}
        />

        <div className="relative p-5 md:p-6 max-w-6xl pb-24 md:pb-6">
          {/* Hero greeting */}
          <div className="fade-in-up mb-6 rounded-3xl p-5 md:p-6 agri-glass overflow-hidden relative">
            <div
              aria-hidden
              className="absolute -right-10 -top-16 w-56 h-56 rounded-full opacity-25"
              style={{ background: "radial-gradient(circle, var(--agri-primary) 0%, transparent 70%)" }}
            />
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-agri-primary-soft text-agri-primary">
                  <Leaf size={12} /> Live field data
                </span>
                <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-agri-ink">
                  {t.goodMorning}
                </h1>
                <p className="text-sm text-agri-muted mt-1">Sunday, 13 Sep 2026 · Rajkot, Gujarat</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-agri-card-soft border border-agri-border">
                <Sun size={22} className="text-agri-warn" />
                <div>
                  <p className="text-lg font-extrabold leading-none text-agri-ink">28°C</p>
                  <p className="text-xs text-agri-muted mt-1">Partly cloudy · 74% rain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
            {metrics.map(({ key, value, icon: Icon, change, tone, trend, progress }) => {
              const Trend = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : TrendingUp;
              return (
                <div
                  key={key}
                  className="fade-in-up agri-card agri-elevate p-4 relative overflow-hidden bg-gradient-to-br from-agri-card to-agri-card-soft"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${TONES[tone].soft}`}>
                      <Icon size={18} className={TONES[tone].fg} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${TONES[tone].soft} ${TONES[tone].fg}`}
                    >
                      <Trend size={12} />
                      {change}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-agri-ink">{value}</p>
                  <p className="text-xs font-semibold text-agri-muted mt-0.5">{t[key as keyof typeof t]}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-agri-card-soft border border-agri-border overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${BARS[tone]}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart + Insights */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            {/* Chart */}
            <div className="lg:col-span-2 agri-card p-5 bg-gradient-to-b from-agri-card to-agri-card-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-agri-ink">7-Day Farm Health</h3>
                  <p className="text-xs text-agri-muted mt-0.5">Health & soil moisture trend</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-agri-primary-soft text-agri-primary">
                  +16% this week
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={healthData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={green} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={green} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={blue} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 6" stroke={grid} vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: axis }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: axis }} axisLine={false} tickLine={false} domain={[40, 100]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 14,
                      border: "1px solid var(--agri-border)",
                      background: "var(--agri-card)",
                      color: "var(--agri-ink)",
                      fontSize: 12,
                      boxShadow: "var(--agri-shadow)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: axis }} iconType="circle" />
                  <Area type="monotone" dataKey="health" stroke={green} strokeWidth={2.5} fill="url(#healthGrad)" name="Farm Health %" />
                  <Area type="monotone" dataKey="moisture" stroke={blue} strokeWidth={2.5} fill="url(#moistureGrad)" name="Soil Moisture %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Insights */}
            <div className="agri-card p-5 bg-gradient-to-b from-agri-card to-agri-card-soft">
              <h3 className="font-bold text-sm mb-4 text-agri-ink">{t.aiInsights}</h3>
              <div className="flex flex-col gap-3">
                {insights.map((ins, i) => {
                  const s = SEVERITY[ins.severity as keyof typeof SEVERITY];
                  const Icon = ins.icon;
                  return (
                    <div key={i} className={`flex gap-3 p-3 rounded-2xl border ${s.wrap}`}>
                      <Icon size={16} className={`${s.icon} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-xs font-bold leading-snug text-agri-ink">{ins.text}</p>
                        <p className="text-xs text-agri-muted mt-1">{ins.action}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent analyses */}
          <div className="agri-card p-5 bg-gradient-to-b from-agri-card to-agri-card-soft">
            <h3 className="font-bold text-sm mb-4 text-agri-ink">{t.recentAnalysis}</h3>
            <div className="flex flex-col gap-2">
              {recentAnalyses.map((a, i) => {
                const healthy = a.status === "healthy";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-agri-border hover:bg-agri-card-soft transition-colors"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${healthy ? "bg-agri-primary-soft" : "bg-agri-danger-soft"}`}
                    >
                      <Leaf size={15} className={healthy ? "text-agri-primary" : "text-agri-danger"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-agri-ink truncate">
                        {a.crop} — {a.result}
                      </p>
                      <p className="text-xs text-agri-muted">{a.date}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${healthy ? "bg-agri-primary-soft text-agri-primary" : "bg-agri-danger-soft text-agri-danger"}`}
                    >
                      {a.confidence}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
