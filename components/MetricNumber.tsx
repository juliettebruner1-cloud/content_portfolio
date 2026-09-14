"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function parseValue(raw: string): { prefix: string; number: number | null; suffix: string; decimals: number } {
  const match = raw.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: raw, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const number = parseFloat(numStr.replace(/,/g, ""));
  return { prefix, number: Number.isNaN(number) ? null : number, suffix, decimals };
}

export function MetricNumber({ value, className }: { value: string; className?: string }) {
  const reduced = useReducedMotion();
  const { prefix, number, suffix, decimals } = parseValue(value);
  const [display, setDisplay] = useState(reduced || number === null ? value : `${prefix}0${suffix}`);
  const [done, setDone] = useState(false);

  const runCountUp = () => {
    if (done || number === null || reduced) {
      setDisplay(value);
      setDone(true);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = number * eased;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setDone(true);
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.span
      className={className}
      onViewportEnter={runCountUp}
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {display}
    </motion.span>
  );
}
