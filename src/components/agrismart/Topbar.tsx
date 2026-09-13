import { Bell, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useLanguage, type Language } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇮🇳" },
  { code: "hi", label: "हिं", flag: "🇮🇳" },
  { code: "gu", label: "ગુ", flag: "🇮🇳" },
];

export default function Topbar({ title }: { title?: string }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showLang, setShowLang] = useState(false);
  const dark = theme === "dark";

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-3 border-b border-agri-border agri-glass"
      style={{ height: 60 }}
    >
      {/* Title or search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {title ? (
          <h1 className="text-base font-bold truncate text-agri-ink">{title}</h1>
        ) : (
          <div className="flex items-center gap-2 bg-agri-card-soft border border-agri-border rounded-lg px-3 py-1.5 max-w-xs w-full">
            <Search size={14} className="text-agri-muted flex-shrink-0" />
            <input
              placeholder={t.search}
              className="bg-transparent text-sm outline-none w-full text-agri-ink placeholder:text-agri-muted"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-agri-muted hover:text-agri-primary hover:bg-agri-primary-soft transition-colors"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-agri-muted hover:bg-agri-primary-soft transition-colors relative"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-agri-danger" />
        </button>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold border border-agri-border text-agri-primary hover:bg-agri-primary-soft transition-colors"
          >
            🇮🇳 {LANG_OPTIONS.find((l) => l.code === language)?.label}
          </button>
          {showLang && (
            <div className="absolute right-0 top-full mt-1 bg-agri-card border border-agri-border rounded-xl shadow-lg overflow-hidden z-30 min-w-[120px]">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code);
                    setShowLang(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-agri-primary-soft transition-colors ${
                    language === opt.code
                      ? "bg-agri-primary-soft font-semibold text-agri-primary"
                      : "text-agri-ink"
                  }`}
                >
                  {opt.flag} {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-agri-primary to-agri-primary-strong">
          F
        </div>
      </div>
    </header>
  );
}
