"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { VisitorIntent, Industry } from "@/types";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "jb_visitor_intent";
const INDUSTRY_KEY = "jb_visitor_industry";

interface IntentContextValue {
  intent: VisitorIntent | null;
  industry: Industry | null;
  hasChosen: boolean;
  setIntent: (intent: VisitorIntent) => void;
  setIndustry: (industry: Industry | null) => void;
  reset: () => void;
}

const IntentContext = createContext<IntentContextValue | undefined>(undefined);

function isVisitorIntent(value: string | null): value is VisitorIntent {
  return (
    value === "brand" ||
    value === "recruiter" ||
    value === "creator" ||
    value === "strategy" ||
    value === "editorial" ||
    value === "explore"
  );
}

const VIEW_PARAM_ALIASES: Record<string, VisitorIntent> = {
  brand: "brand",
  brands: "brand",
  recruiter: "recruiter",
  hiring: "recruiter",
  creator: "creator",
  creative: "creator",
  strategy: "strategy",
  editorial: "editorial",
  explore: "explore",
};

export function IntentProvider({ children }: { children: React.ReactNode }) {
  const [intent, setIntentState] = useState<VisitorIntent | null>(null);
  const [industry, setIndustryState] = useState<Industry | null>(null);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect --
       One-time hydration from the URL/localStorage after mount — deliberately
       not a subscription. Running this during render would mismatch SSR
       output, since the server can't see the URL's query string or storage. */
    // URL params (?view=brand, ?industry=beauty) take priority so shared
    // links always land in the intended curated view.
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    const industryParam = params.get("industry");

    let resolvedIntent: VisitorIntent | null = null;
    if (viewParam && VIEW_PARAM_ALIASES[viewParam.toLowerCase()]) {
      resolvedIntent = VIEW_PARAM_ALIASES[viewParam.toLowerCase()];
    } else {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isVisitorIntent(stored)) resolvedIntent = stored;
    }

    if (resolvedIntent) {
      setIntentState(resolvedIntent);
      setHasChosen(true);
      window.localStorage.setItem(STORAGE_KEY, resolvedIntent);
    }

    if (industryParam) {
      const match = ["Fashion", "Beauty", "Wellness", "Lifestyle", "Hospitality", "NYC / Events"].find(
        (i) => i.toLowerCase() === industryParam.toLowerCase()
      );
      if (match) {
        setIndustryState(match as Industry);
        window.sessionStorage.setItem(INDUSTRY_KEY, match);
      }
    } else {
      const storedIndustry = window.sessionStorage.getItem(INDUSTRY_KEY);
      if (storedIndustry) setIndustryState(storedIndustry as Industry);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setIntent = useCallback((next: VisitorIntent) => {
    setIntentState(next);
    setHasChosen(true);
    window.localStorage.setItem(STORAGE_KEY, next);
    track({ name: "visitor_intent_selected", intent: next });
  }, []);

  const setIndustry = useCallback((next: Industry | null) => {
    setIndustryState(next);
    if (next) window.sessionStorage.setItem(INDUSTRY_KEY, next);
    else window.sessionStorage.removeItem(INDUSTRY_KEY);
  }, []);

  const reset = useCallback(() => {
    setIntentState(null);
    setIndustryState(null);
    setHasChosen(false);
    window.localStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.removeItem(INDUSTRY_KEY);
    track({ name: "curated_view_reset" });
  }, []);

  const value = useMemo(
    () => ({ intent, industry, hasChosen, setIntent, setIndustry, reset }),
    [intent, industry, hasChosen, setIntent, setIndustry, reset]
  );

  return <IntentContext.Provider value={value}>{children}</IntentContext.Provider>;
}

export function useIntent() {
  const ctx = useContext(IntentContext);
  if (!ctx) throw new Error("useIntent must be used within IntentProvider");
  return ctx;
}
