import { AlertTriangle, TrendingUp, Droplets, Thermometer, CloudRain, Leaf } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Topbar from "@/components/agrismart/Topbar";
import { useLanguage } from "@/context/LanguageContext";

const healthData = [
  { day: "Mon", health: 72, moisture: 58 },
  { day: "Tue", health: 78, moisture: 62 },
  { day: "Wed", health: 75, moisture: 55 },
  { day: "Thu", health: 82, moisture: 70 },
  { day: "Fri", health: 80, moisture: 65 },
  { day: "Sat", health: 85, moisture: 68 },
  { day: "Sun", health: 88, moisture: 72 },
];

const metrics = [
  { key: "farmHealth", value: "88%", icon: TrendingUp, change: "+3%", color: "#16A34A", bg: "#DCFCE7" },
  { key: "cropHealth", value: "82%", icon: Leaf, change: "+5%", color: "#16A34A", bg: "#DCFCE7" },
  { key: "soilMoisture", value: "68%", icon: Droplets, change: "-2%", color: "#3b82f6", bg: "#dbeafe" },
  { key: "temperature", value: "28°C", icon: Thermometer, change: "+1°C", color: "#f59e0b", bg: "#fef3c7" },
  { key: "rainProbability", value: "74%", icon: CloudRain, change: "High", color: "#6366f1", bg: "#e0e7ff" },
  { key: "sustainabilityScore", value: "82", icon: TrendingUp, change: "Excellent", color: "#16A34A", bg: "#DCFCE7" },
];

const insights = [
  { icon: CloudRain, text: "Rain is likely within the next 24 hours.", action: "Consider delaying irrigation.", severity: "warning" },
  { icon: Leaf, text: "Tomato crops showing early signs of stress.", action: "Check moisture levels in Zone B.", severity: "alert" },
  { icon: TrendingUp, text: "Soil pH is optimal for current crops.", action: "No action required.", severity: "success" },
];

const recentAnalyses = [
  { crop: "Tomato", result: "Early Blight", confidence: 91, date: "Today, 9:42 AM", status: "disease" },
  { crop: "Wheat", result: "Healthy", confidence: 96, date: "Yesterday, 3:15 PM", status: "healthy" },
  { crop: "Rice", result: "Leaf Spot", confidence: 84, date: "2 days ago", status: "disease" },
];

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#F7FAF7" }}>
      <Topbar />
      <div className="p-5 md:p-6 max-w-6xl">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold" style={{ color: "#172018" }}>
            {t.goodMorning}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sunday, 13 Sep 2026 · Rajkot, Gujarat</p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {metrics.map(({ key, value, icon: Icon, change, color, bg }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-4 border hover:shadow-sm transition-shadow"
              style={{ borderColor: "#e2f0e5" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: bg, color }}>
                  {change}
                </span>
              </div>
              <p className="text-2xl font-extrabold" style={{ color: "#172018" }}>{value}</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">{t[key as keyof typeof t]}</p>
            </div>
          ))}
        </div>

        {/* Chart + Insights */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border" style={{ borderColor: "#e2f0e5" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "#172018" }}>7-Day Farm Health</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F7D32" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2F7D32" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2f0e5", fontSize: 12 }} />
                <Area type="monotone" dataKey="health" stroke="#2F7D32" strokeWidth={2} fill="url(#healthGrad)" name="Farm Health %" />
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={2} fill="url(#moistureGrad)" name="Soil Moisture %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#e2f0e5" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "#172018" }}>{t.aiInsights}</h3>
            <div className="flex flex-col gap-3">
              {insights.map((ins, i) => (
                <div key={i} className="p-3 rounded-xl" style={{
                  background: ins.severity === "success" ? "#f0fdf4" : ins.severity === "warning" ? "#fffbeb" : "#fff7f7",
                  border: `1px solid ${ins.severity === "success" ? "#bbf7d0" : ins.severity === "warning" ? "#fde68a" : "#fecaca"}`
                }}>
                  <p className="text-xs font-semibold leading-snug" style={{ color: "#172018" }}>{ins.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{ins.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent analyses */}
        <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#e2f0e5" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "#172018" }}>{t.recentAnalysis}</h3>
          <div className="flex flex-col gap-2">
            {recentAnalyses.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: a.status === "healthy" ? "#DCFCE7" : "#fee2e2" }}>
                  <Leaf size={14} style={{ color: a.status === "healthy" ? "#16A34A" : "#DC2626" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#172018" }}>{a.crop} — {a.result}</p>
                  <p className="text-xs text-gray-400">{a.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: a.status === "healthy" ? "#DCFCE7" : "#fee2e2",
                      color: a.status === "healthy" ? "#16A34A" : "#DC2626"
                    }}>
                    {a.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
