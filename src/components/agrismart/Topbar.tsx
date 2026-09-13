import { Bell, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useLanguage, type Language } from "../../context/LanguageContext";

const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇮🇳" },
  { code: "hi", label: "हिं", flag: "🇮🇳" },
  { code: "gu", label: "ગુ", flag: "🇮🇳" },
];

export default function Topbar({ title }: { title?: string }) {
  const { language, setLanguage, t } = useLanguage();
  const [dark, setDark] = useState(false);
  const [showLang, setShowLang] = useState(false);

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-3 border-b"
      style={{ background: "#fff", borderColor: "#e2f0e5", height: 60 }}
    >
      {/* Title or search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {title ? (
          <h1 className="text-base font-bold truncate" style={{ color: "#172018" }}>
            {title}
          </h1>
        ) : (
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 max-w-xs w-full">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              placeholder={t.search}
              className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder-gray-400"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme */}
        <button
          onClick={() => setDark(!dark)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold border border-green-200 hover:bg-green-50 transition-colors"
            style={{ color: "#2F7D32" }}
          >
            🇮🇳 {LANG_OPTIONS.find(l => l.code === language)?.label}
          </button>
          {showLang && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-30 min-w-[120px]">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => { setLanguage(opt.code); setShowLang(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-green-50 transition-colors ${
                    language === opt.code ? "bg-green-50 font-semibold text-green-700" : "text-gray-700"
                  }`}
                >
                  {opt.flag} {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ background: "#2F7D32" }}
        >
          F
        </div>
      </div>
    </header>
  );
}
