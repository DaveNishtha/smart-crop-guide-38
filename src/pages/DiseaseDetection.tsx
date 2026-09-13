import { useState, useRef } from "react";
import { Upload, Camera, Scan, CheckCircle, Circle, Loader, AlertCircle, X } from "lucide-react";
import Topbar from "@/components/agrismart/Topbar";
import { useLanguage } from "@/context/LanguageContext";

type Stage = "upload" | "scanning" | "result";

const CROPS = ["Tomato", "Wheat", "Rice", "Maize", "Cotton", "Potato", "Soybean"];
const GROWTH_STAGES = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Maturity"];

const scanSteps = [
  { key: "imageQuality", done: true },
  { key: "leafDetection", done: true },
  { key: "diseaseClassification", done: false, active: true },
  { key: "generatingRecs", done: false },
];

export default function DiseaseDetection() {
  const { t } = useLanguage();
  const [stage, setStage] = useState<Stage>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function startAnalysis() {
    setStage("scanning");
    setScanProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      setScanProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setStage("result"), 500);
      }
    }, 300);
  }

  function reset() {
    setStage("upload");
    setImageUrl(null);
    setCrop("");
    setGrowthStage("");
    setScanProgress(0);
  }

  if (stage === "scanning") return <ScanningView progress={scanProgress} imageUrl={imageUrl} t={t} />;
  if (stage === "result") return <ResultView imageUrl={imageUrl} onReset={reset} t={t} />;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#F7FAF7" }}>
      <Topbar title={t.aiCropDiagnosis} />
      <div className="p-5 md:p-6 max-w-2xl">
        <p className="text-gray-500 text-sm mb-6">{t.uploadInstruction}</p>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !imageUrl && fileRef.current?.click()}
          className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 mb-5"
          style={{
            borderColor: dragging ? "#2F7D32" : imageUrl ? "#2F7D32" : "#bbf7d0",
            background: dragging ? "#f0fdf4" : imageUrl ? "#f0fdf4" : "white",
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {imageUrl ? (
            <div className="relative">
              <img src={imageUrl} alt="Selected leaf" className="max-h-48 mx-auto rounded-xl object-contain" />
              <button
                onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center"
              >
                <X size={12} className="text-gray-500" />
              </button>
              <p className="text-xs text-green-600 font-semibold mt-3">Image ready for analysis</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "#DCFCE7" }}>
                <Upload size={24} style={{ color: "#2F7D32" }} />
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: "#172018" }}>{t.dragDrop}</p>
              <p className="text-xs text-gray-400 mb-4">{t.supportedFormats}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white"
                  style={{ background: "#2F7D32" }}
                >
                  <Upload size={13} /> {t.uploadImage}
                </button>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border"
                  style={{ borderColor: "#2F7D32", color: "#2F7D32" }}
                >
                  <Camera size={13} /> {t.useCamera}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Crop + Stage selects */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{t.selectCrop}</label>
            <select
              value={crop}
              onChange={e => setCrop(e.target.value)}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
              style={{ borderColor: "#e2f0e5", background: "white", color: "#172018" }}
            >
              <option value="">Select crop…</option>
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{t.growthStage}</label>
            <select
              value={growthStage}
              onChange={e => setGrowthStage(e.target.value)}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
              style={{ borderColor: "#e2f0e5", background: "white", color: "#172018" }}
            >
              <option value="">Select stage…</option>
              {GROWTH_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Analyze button */}
        <button
          onClick={startAnalysis}
          disabled={!imageUrl}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
          style={{ background: "#2F7D32" }}
        >
          <Scan size={16} /> {t.analyzeWithAI}
        </button>

        {/* Tips */}
        <div className="mt-5 p-4 rounded-xl border" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
          <p className="text-xs font-bold mb-2" style={{ color: "#14532D" }}>📸 Tips for best results</p>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Use good natural lighting</li>
            <li>Focus on affected area of the leaf</li>
            <li>Avoid blurry or dark photos</li>
            <li>Include both healthy and diseased portions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ScanningView({ progress, imageUrl, t }: { progress: number; imageUrl: string | null; t: ReturnType<typeof useLanguage>["t"] }) {
  const steps = [
    { label: t.imageQuality, done: progress > 25 },
    { label: t.leafDetection, done: progress > 50 },
    { label: t.diseaseClassification, done: progress > 75, active: progress > 50 && progress <= 75 },
    { label: t.generatingRecs, done: progress >= 100, active: progress > 75 && progress < 100 },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#F7FAF7" }}>
      <Topbar title={t.aiCropDiagnosis} />
      <div className="p-5 md:p-6 max-w-xl flex flex-col items-center">
        {/* Image with scan overlay */}
        <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl mb-6 border-2"
          style={{ borderColor: "#86efac" }}>
          {imageUrl ? (
            <img src={imageUrl} alt="Analyzing leaf" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: "#DCFCE7" }} />
          )}
          <div className="absolute inset-0" style={{ background: "rgba(20,83,45,0.35)" }} />
          {/* Scan line */}
          <div className="absolute left-0 right-0 h-1 scan-line"
            style={{ background: "linear-gradient(90deg, transparent, #4ade80, transparent)", boxShadow: "0 0 12px #4ade80" }} />
          {/* Corner brackets */}
          {[["top-4 left-4 border-t-2 border-l-2", ""], ["top-4 right-4 border-t-2 border-r-2", ""], ["bottom-4 left-4 border-b-2 border-l-2", ""], ["bottom-4 right-4 border-b-2 border-r-2", ""]].map(([cls], i) => (
            <div key={i} className={`absolute w-6 h-6 ${cls}`} style={{ borderColor: "#4ade80" }} />
          ))}
        </div>

        <p className="text-base font-bold mb-1" style={{ color: "#172018" }}>{t.analyzing}</p>
        <p className="text-xs text-gray-400 mb-5">{Math.round(progress)}% complete</p>

        {/* Progress bar */}
        <div className="w-full max-w-xs h-2 rounded-full mb-6" style={{ background: "#DCFCE7" }}>
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "#2F7D32" }}
          />
        </div>

        {/* Steps */}
        <div className="w-full max-w-xs space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              {step.done ? (
                <CheckCircle size={16} style={{ color: "#16A34A" }} className="flex-shrink-0" />
              ) : step.active ? (
                <Loader size={16} style={{ color: "#2F7D32" }} className="flex-shrink-0 animate-spin" />
              ) : (
                <Circle size={16} className="text-gray-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${step.done ? "font-semibold" : step.active ? "font-medium" : "text-gray-400"}`}
                style={{ color: step.done ? "#16A34A" : step.active ? "#172018" : undefined }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultView({ imageUrl, onReset, t }: { imageUrl: string | null; onReset: () => void; t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#F7FAF7" }}>
      <Topbar title={t.aiCropDiagnosis} />
      <div className="p-5 md:p-6 max-w-2xl">
        {/* Result header */}
        <div className="bg-white rounded-2xl p-5 border mb-4 fade-in-up" style={{ borderColor: "#e2f0e5" }}>
          <div className="flex gap-4 items-start">
            {imageUrl && (
              <img src={imageUrl} alt="Analyzed leaf" className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border" style={{ borderColor: "#e2f0e5" }} />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">Disease Detected</span>
              </div>
              <h2 className="text-xl font-extrabold" style={{ color: "#172018" }}>Early Blight</h2>
              <p className="text-xs text-gray-500 mt-0.5">Alternaria solani · Tomato</p>
            </div>
          </div>

          {/* Confidence meter */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span style={{ color: "#172018" }}>{t.confidence}</span>
              <span style={{ color: "#2F7D32" }}>91%</span>
            </div>
            <div className="h-2.5 rounded-full" style={{ background: "#e5e7eb" }}>
              <div className="h-2.5 rounded-full" style={{ width: "91%", background: "linear-gradient(90deg, #16A34A, #2F7D32)" }} />
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-white rounded-2xl p-5 border mb-4 fade-in-up" style={{ borderColor: "#e2f0e5" }}>
          <h3 className="text-sm font-bold mb-2" style={{ color: "#172018" }}>🧠 AI Reasoning</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Detected concentric ring patterns characteristic of <em>Alternaria solani</em> with dark brown lesions surrounded by yellow halos. The infection appears to be in early stages, affecting approximately 30% of the leaf surface area.
          </p>
        </div>

        {/* Precautions */}
        <div className="bg-white rounded-2xl p-5 border mb-4 fade-in-up" style={{ borderColor: "#e2f0e5" }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: "#172018" }}>⚠️ {t.precautions}</h3>
          <ul className="space-y-2">
            {["Remove and destroy affected leaves immediately", "Avoid overhead watering — use drip irrigation", "Monitor nearby plants for spread", "Ensure proper air circulation"].map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#F59E0B" }} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended actions */}
        <div className="bg-white rounded-2xl p-5 border mb-5 fade-in-up" style={{ borderColor: "#e2f0e5" }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: "#172018" }}>✅ {t.recommendedActions}</h3>
          <ul className="space-y-2">
            {["Apply copper-based fungicide every 7-10 days", "Spray chlorothalonil (Bravo) at first sign", "Improve soil drainage in affected areas", "Consider resistant tomato varieties for next season"].map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={13} style={{ color: "#16A34A" }} className="flex-shrink-0 mt-0.5" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
            style={{ background: "#2F7D32" }}
          >
            {t.viewDetailedAnalysis}
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-3 rounded-xl font-bold text-sm border transition-all hover:bg-green-50"
            style={{ borderColor: "#2F7D32", color: "#2F7D32" }}
          >
            {t.analyzeAnotherLeaf}
          </button>
        </div>
      </div>
    </div>
  );
}
