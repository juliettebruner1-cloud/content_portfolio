"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorMode = "default" | "play" | "view" | "nav" | "star";

const LABELS: Record<CursorMode, string> = {
  default: "",
  play: "PLAY",
  view: "VIEW",
  nav: "",
  star: "✦",
};

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: prefersReduced ? 1000 : 350, damping: 30 });
  const springY = useSpring(y, { stiffness: prefersReduced ? 1000 : 350, damping: 30 });

  useEffect(() => {
    if (isTouch) return;

    document.body.classList.add("cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setMode((target?.dataset.cursor as CursorMode) ?? "default");
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.body.classList.remove("cursor-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch]);

  if (isTouch) return null;

  const isLabelMode = mode === "play" || mode === "view";
  const isNav = mode === "nav";

  return (
    <motion.div
      aria-hidden="true"
      className="no-print pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isLabelMode ? 76 : isNav ? 40 : 14,
        height: isLabelMode ? 76 : isNav ? 40 : 14,
        opacity: visible ? 1 : 0,
        backgroundColor: isLabelMode || isNav ? "#F4F1EB" : "transparent",
        border: isLabelMode || isNav ? "none" : "1px solid #F4F1EB",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {isLabelMode && (
        <span className="label text-ink" style={{ fontSize: "0.55rem" }}>
          {LABELS[mode]}
        </span>
      )}
      {mode === "star" && <span className="text-ivory text-xs">✦</span>}
    </motion.div>
  );
}
