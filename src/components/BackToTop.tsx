"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const UMBRAL_PX = 450;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > UMBRAL_PX);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function irArriba() {
    const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={irArriba}
      aria-label="Volver al inicio"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`lg:hidden fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-30 w-12 h-12 rounded-full bg-brand-500 text-cream shadow-lg shadow-black/20 flex items-center justify-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.25} />
    </button>
  );
}
