// Minimal translations stub — extend as needed
export const LANGUAGES = [
  { code:"en", label:"English", dir:"ltr" },
  { code:"ar", label:"العربية", dir:"rtl" },
  { code:"ru", label:"Русский", dir:"ltr" },
  { code:"zh", label:"中文", dir:"ltr" },
  { code:"de", label:"Deutsch", dir:"ltr" },
  { code:"fr", label:"Français", dir:"ltr" },
];
export function getStoredLang(){ try{ return localStorage.getItem("dr_lang")||"en" }catch{ return "en" } }
export function setStoredLang(l){ try{ localStorage.setItem("dr_lang",l) }catch{} }
export function getText(obj,lang){ return obj?.[lang]||obj?.en||"" }
export function t(key,lang){ return key }
