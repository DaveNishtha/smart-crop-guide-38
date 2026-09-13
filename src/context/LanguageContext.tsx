import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "en" | "hi" | "gu";

type Translations = typeof en;

const en = {
  appName: "AGRISMART AI",
  tagline: "AI-powered intelligence for healthier crops and sustainable farms.",
  subtitle: "Detect crop diseases, understand weather, optimize irrigation and make smarter farming decisions.",
  analyzeBtn: "Analyze My Crop",
  exploreBtn: "Explore Dashboard",
  chooseLanguage: "Choose your language",
  continueBtn: "Continue →",
  goodMorning: "Good Morning, Farmer 👋",
  farmHealth: "Farm Health",
  cropHealth: "Crop Health",
  soilMoisture: "Soil Moisture",
  temperature: "Temperature",
  rainProbability: "Rain Probability",
  sustainabilityScore: "Sustainability Score",
  aiInsights: "AI Insights",
  recentAnalysis: "Recent Crop Analysis",
  home: "Home",
  cropDiagnosis: "Crop Diagnosis",
  cropRecommendation: "Crop Recommendation",
  smartIrrigation: "Smart Irrigation",
  weather: "Weather",
  sustainability: "Sustainability",
  farmerAssistant: "Farmer Assistant",
  farmSensors: "Farm Sensors",
  settings: "Settings",
  aiCropDiagnosis: "AI Crop Diagnosis",
  uploadInstruction: "Upload a clear photo of your crop leaf.",
  dragDrop: "Drag & Drop your image here",
  uploadImage: "Upload Image",
  useCamera: "Use Camera",
  selectCrop: "Select Crop",
  growthStage: "Growth Stage",
  analyzeWithAI: "Analyze with AI",
  analyzing: "AI is analyzing your crop…",
  imageQuality: "Image quality check",
  leafDetection: "Leaf detection",
  diseaseClassification: "Disease classification",
  generatingRecs: "Generating recommendations",
  viewDetailedAnalysis: "View Detailed Analysis",
  analyzeAnotherLeaf: "Analyze Another Leaf",
  recommendCrop: "Recommend Crop",
  chatPlaceholder: "Ask me anything about your farm…",
  send: "Send",
  search: "Search…",
  notifications: "Notifications",
  live: "Live",
  offline: "Offline",
  lastUpdated: "Last updated",
  delayIrrigation: "DELAY IRRIGATION",
  waterSaved: "Estimated water saved",
  excellent: "Excellent",
  supportedFormats: "Supports JPG, PNG, WEBP up to 10MB",
  precautions: "Precautions",
  recommendedActions: "Recommended Actions",
  confidence: "Confidence",
};

const hi: Translations = {
  appName: "एग्रीस्मार्ट AI",
  tagline: "स्वस्थ फसलों और टिकाऊ खेती के लिए AI-संचालित बुद्धिमत्ता।",
  subtitle: "फसल रोग का पता लगाएं, मौसम समझें, सिंचाई अनुकूलित करें और स्मार्ट खेती निर्णय लें।",
  analyzeBtn: "मेरी फसल का विश्लेषण करें",
  exploreBtn: "डैशबोर्ड देखें",
  chooseLanguage: "अपनी भाषा चुनें",
  continueBtn: "जारी रखें →",
  goodMorning: "शुभ प्रभात, किसान 👋",
  farmHealth: "खेत स्वास्थ्य",
  cropHealth: "फसल स्वास्थ्य",
  soilMoisture: "मिट्टी की नमी",
  temperature: "तापमान",
  rainProbability: "वर्षा संभावना",
  sustainabilityScore: "स्थिरता स्कोर",
  aiInsights: "AI अंतर्दृष्टि",
  recentAnalysis: "हालिया फसल विश्लेषण",
  home: "होम",
  cropDiagnosis: "फसल निदान",
  cropRecommendation: "फसल अनुशंसा",
  smartIrrigation: "स्मार्ट सिंचाई",
  weather: "मौसम",
  sustainability: "स्थिरता",
  farmerAssistant: "किसान सहायक",
  farmSensors: "खेत सेंसर",
  settings: "सेटिंग्स",
  aiCropDiagnosis: "AI फसल निदान",
  uploadInstruction: "अपनी फसल की पत्ती की स्पष्ट फोटो अपलोड करें।",
  dragDrop: "यहाँ अपनी छवि खींचें और छोड़ें",
  uploadImage: "छवि अपलोड करें",
  useCamera: "कैमरा उपयोग करें",
  selectCrop: "फसल चुनें",
  growthStage: "विकास चरण",
  analyzeWithAI: "AI से विश्लेषण करें",
  analyzing: "AI आपकी फसल का विश्लेषण कर रहा है…",
  imageQuality: "छवि गुणवत्ता जांच",
  leafDetection: "पत्ती की पहचान",
  diseaseClassification: "रोग वर्गीकरण",
  generatingRecs: "सिफारिशें उत्पन्न करना",
  viewDetailedAnalysis: "विस्तृत विश्लेषण देखें",
  analyzeAnotherLeaf: "दूसरी पत्ती का विश्लेषण करें",
  recommendCrop: "फसल की सिफारिश करें",
  chatPlaceholder: "अपने खेत के बारे में कुछ भी पूछें…",
  send: "भेजें",
  search: "खोजें…",
  notifications: "सूचनाएं",
  live: "लाइव",
  offline: "ऑफलाइन",
  lastUpdated: "अंतिम अपडेट",
  delayIrrigation: "सिंचाई में देरी करें",
  waterSaved: "अनुमानित जल बचत",
  excellent: "उत्कृष्ट",
  supportedFormats: "JPG, PNG, WEBP 10MB तक समर्थित",
  precautions: "सावधानियां",
  recommendedActions: "अनुशंसित कार्रवाइयां",
  confidence: "विश्वास",
};

const gu: Translations = {
  appName: "એગ્રીસ્માર્ટ AI",
  tagline: "સ્વસ્થ પાક અને ટકાઉ ખેતી માટે AI-સંચાલિત બુદ્ધિ.",
  subtitle: "પાકના રોગ શોધો, હવામાન સમજો, સિંચાઈ ઑપ્ટિમાઈઝ કરો અને સ્માર્ટ ખેતી નિર્ણયો લો.",
  analyzeBtn: "મારા પાકનું વિશ્લેષણ કરો",
  exploreBtn: "ડૅશબોર્ડ જુઓ",
  chooseLanguage: "તમારી ભાષા પસંદ કરો",
  continueBtn: "આગળ વધો →",
  goodMorning: "સુપ્રભાત, ખેડૂત 👋",
  farmHealth: "ખેત આરોગ્ય",
  cropHealth: "પાક આરોગ્ય",
  soilMoisture: "માટીની ભેજ",
  temperature: "તાપમાન",
  rainProbability: "વરસાદ સંભાવના",
  sustainabilityScore: "ટકાઉ સ્કોર",
  aiInsights: "AI આંતરદૃષ્ટિ",
  recentAnalysis: "તાજેતરનું પાક વિશ્લેષણ",
  home: "હોમ",
  cropDiagnosis: "પાક નિદાન",
  cropRecommendation: "પાક ભલામણ",
  smartIrrigation: "સ્માર્ટ સિંચાઈ",
  weather: "હવામાન",
  sustainability: "ટકાઉપણું",
  farmerAssistant: "ખેડૂત સહાયક",
  farmSensors: "ખેત સેન્સર",
  settings: "સેટિંગ્સ",
  aiCropDiagnosis: "AI પાક નિદાન",
  uploadInstruction: "તમારા પાકના પાનની સ્પષ્ટ ફોટો અપલોડ કરો.",
  dragDrop: "અહીં તમારી છબી ખેંચો અને છોડો",
  uploadImage: "છબી અપલોડ કરો",
  useCamera: "કૅમેરો વાપરો",
  selectCrop: "પાક પસંદ કરો",
  growthStage: "વૃદ્ધિ તબક્કો",
  analyzeWithAI: "AI સાથે વિશ્લેષણ કરો",
  analyzing: "AI તમારા પાકનું વિશ્લેષણ કરી રહ્યું છે…",
  imageQuality: "છબી ગુણવત્તા તપાસ",
  leafDetection: "પાન શોધ",
  diseaseClassification: "રોગ વર્ગીકરણ",
  generatingRecs: "ભલામણો બનાવવી",
  viewDetailedAnalysis: "વિગતવાર વિશ્લેષણ જુઓ",
  analyzeAnotherLeaf: "બીજા પાનનું વિશ્લેષણ કરો",
  recommendCrop: "પાક ભલામણ કરો",
  chatPlaceholder: "તમારા ખેત વિશે કંઈ પૂછો…",
  send: "મોકલો",
  search: "શોધો…",
  notifications: "સૂચનાઓ",
  live: "લાઈવ",
  offline: "ઑફલાઈન",
  lastUpdated: "છેલ્લે અપડેટ",
  delayIrrigation: "સિંચાઈ મોડી કરો",
  waterSaved: "અંદાજિત પાણી બચત",
  excellent: "ઉત્તમ",
  supportedFormats: "JPG, PNG, WEBP 10MB સુધી સમર્થિત",
  precautions: "સાવચેતી",
  recommendedActions: "ભલામણ કરેલ ક્રિયાઓ",
  confidence: "વિશ્વાસ",
};

export const TRANSLATIONS: Record<Language, Translations> = { en, hi, gu };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languageSelected: boolean;
  setLanguageSelected: (v: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [languageSelected, setLanguageSelected] = useState(false);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: TRANSLATIONS[language],
      languageSelected,
      setLanguageSelected,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
