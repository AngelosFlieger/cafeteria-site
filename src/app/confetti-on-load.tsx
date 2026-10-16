"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export function ConfettiOnLoad() {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return null;
}
