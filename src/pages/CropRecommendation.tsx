import { useState } from "react";
import { Sprout, ChevronDown, Loader } from "lucide-react";
import Topbar from "@/components/agrismart/Topbar";
import { useLanguage } from "@/context/LanguageContext";

const soilTypes = ["Clay", "Sandy", "Loamy", "Silty", "Peaty", "Chalky"];
const seasons = ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"];
const waterOptions = ["Abundant", "Moderate", "Limited", "Rain-fed only"];

const altCrops = [
  { name: "Soybean", match: 82 },
  { name: "Maize", match: 76 },
  { name: "Cotton", match: 71 },
];

export default function CropRecommendation() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [form, setForm] = useState({ soil: "", ph: "", temp: "", humidity: "", rainfall: "", water: "", season: "", prev: "" });

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setResult(true); }, 1800);
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--agri-bg)" }}>
      <Topbar title={t.cropRecommendation} />
      <div className="p-5 md:p-6 max-w-2xl">
        <p className="text-sm text-agri-muted mb-6">Enter your farm details to get the best crop recommendation for your conditions.</p>

        {/* Form */}
        <div className="bg-agri-card rounded-2xl p-5 border mb-5" style={{ borderColor: "var(--agri-border)" }}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Soil Type", key: "soil", type: "select", opts: soilTypes },
              { label: "Soil pH (0–14)", key: "ph", type: "number", placeholder: "e.g. 6.5" },
              { label: "Temperature (°C)", key: "temp", type: "number", placeholder: "e.g. 28" },
              { label: "Humidity (%)", key: "humidity", type: "number", placeholder: "e.g. 70" },
              { label: "Rainfall (mm)", key: "rainfall", type: "number", placeholder: "e.g. 800" },
              { label: "Water Availability", key: "water", type: "select", opts: waterOptions },
              { label: "Season", key: "season", type: "select", opts: seasons },
              { label: "Previous Crop", key: "prev", type: "text", placeholder: "e.g. Wheat" },
            ].map(({ label, key, type, opts, placeholder }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-agri-muted mb-1.5 block">{label}</label>
                {type === "select" ? (
                  <select
                    value={form[key as keyof typeof form]}
                    onChange={e => set(key, e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-green-500"
                    style={{ borderColor: "var(--agri-border)", background: "white", color: "var(--agri-ink)" }}
                  >
                    <option value="">Select…</option>
                    {opts?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-green-500"
                    style={{ borderColor: "var(--agri-border)", color: "var(--agri-ink)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 mb-5 transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "#2F7D32" }}
        >
          {loading ? <Loader size={16} className="animate-spin" /> : <Sprout size={16} />}
          {loading ? "Analyzing…" : t.recommendCrop}
        </button>

        {/* Result */}
        {result && (
          <div className="fade-in-up space-y-4">
            {/* Top recommendation */}
            <div className="bg-agri-card rounded-2xl p-5 border" style={{ borderColor: "#bbf7d0", boxShadow: "0 0 0 2px #bbf7d0" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#DCFCE7" }}>
                  <Sprout size={22} style={{ color: "#2F7D32" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-agri-muted mb-0.5">Top Recommendation</p>
                  <h2 className="text-xl font-extrabold" style={{ color: "var(--agri-ink)" }}>Tomato</h2>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-extrabold" style={{ color: "#16A34A" }}>94%</p>
                  <p className="text-xs text-agri-muted">Suitability</p>
                </div>
              </div>

              {/* Suitability bar */}
              <div className="h-2 rounded-full mb-4" style={{ background: "#e5e7eb" }}>
                <div className="h-2 rounded-full" style={{ width: "94%", background: "#16A34A" }} />
              </div>

              <h3 className="text-xs font-bold mb-2" style={{ color: "var(--agri-ink)" }}>Why this crop?</h3>
              <ul className="text-xs text-agri-muted space-y-1.5">
                {["Loamy soil matches tomato's nutrient needs perfectly", "28°C temperature is optimal for fruit development", "Kharif season timing aligns with tomato growing cycle", "Previous wheat crop improves soil nitrogen availability"].map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: "#16A34A" }}>✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternatives */}
            <div className="bg-agri-card rounded-2xl p-5 border" style={{ borderColor: "var(--agri-border)" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "var(--agri-ink)" }}>Alternative Crops</h3>
              {altCrops.map(c => (
                <div key={c.name} className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                    <Sprout size={14} style={{ color: "#2F7D32" }} />
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: "var(--agri-ink)" }}>{c.name}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${c.match}%`, background: "#86efac" }} />
                  </div>
                  <span className="text-xs font-bold w-8 text-right" style={{ color: "#16A34A" }}>{c.match}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
