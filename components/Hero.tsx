"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero({ backgroundImage }: { backgroundImage?: string }) {
  const [statementIndex, setStatementIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setStatementIndex((i) => (i + 1) % profile.positioningStatements.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-65px)] flex-col justify-between overflow-hidden border-b hairline px-5 pb-10 pt-14 sm:px-8">
      {backgroundImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 z-0 h-full w-full scale-105 object-cover"
            style={{ filter: "brightness(0.5) contrast(1.05) saturate(1.1)" }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/55 to-black" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(244,241,235,0.06), transparent 70%)",
          }}
        />
      )}

      {!reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 animate-flash bg-ivory"
        />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span className="label text-taupe">{profile.heroKicker}</span>
        <span className="label text-taupe">{profile.issueNumber}</span>
      </div>

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-serif text-display-1 text-ivory"
        >
          {profile.heroHeadline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-x-3 gap-y-1"
        >
          {profile.tagline.split("/").map((word) => (
            <span key={word} className="label text-taupe">
              {word.trim()}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <motion.p
          key={statementIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md font-serif text-xl italic leading-snug text-ivory text-balance sm:text-2xl"
        >
          {profile.positioningStatements[statementIndex]}
        </motion.p>

        <div className="flex items-center gap-2 text-taupe">
          <span className="label">Scroll</span>
          <motion.span
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
