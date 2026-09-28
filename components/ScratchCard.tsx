"use client";

import { useEffect, useRef, useState } from "react";
import type { FeaturedOffer } from "@/lib/sanity/queries";

const FALLBACK: FeaturedOffer = {
  _id: "fallback-scratch",
  offerType: "Credit Card",
  title: "5% Cashback Card",
  benefits: [],
  applyLink: "#",
  icon: "💳",
};

export default function ScratchCard({ offer }: { offer: FeaturedOffer | null }) {
  const content = offer || FALLBACK;
  const [show, setShow] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState<{ id: number; dx: number; dy: number; emoji: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem("sl365_scratch_last_shown");
    if (lastShown !== today) {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!show || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#C0C4CC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 30, 0, Math.PI * 2);
      ctx.fill();
    }

    function getPos(e: MouseEvent | TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const point = "touches" in e ? e.touches[0] : e;
      return { x: point.clientX - rect.left, y: point.clientY - rect.top };
    }

    function scratch(x: number, y: number) {
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.beginPath();
      ctx!.arc(x, y, 22, 0, Math.PI * 2);
      ctx!.fill();
    }

    function checkRevealProgress() {
      const imageData = ctx!.getImageData(0, 0, canvas!.width, canvas!.height).data;
      let cleared = 0;
      let sampled = 0;
      for (let i = 3; i < imageData.length; i += 4 * 20) {
        sampled++;
        if (imageData[i] === 0) cleared++;
      }
      const ratio = cleared / sampled;
      if (ratio > 0.22) {
        triggerReveal();
      }
    }

    function triggerReveal() {
      setRevealed(true);
      const emojis = ["🎉", "✨", "🎊", "💰"];
      const newParticles = Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 12;
        const dist = 90 + Math.random() * 40;
        return { id: i, dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, emoji: emojis[i % emojis.length] };
      });
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 900);
    }

    function startDraw(e: MouseEvent | TouchEvent) {
      drawingRef.current = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    }
    function moveDraw(e: MouseEvent | TouchEvent) {
      if (!drawingRef.current) return;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
      checkRevealProgress();
    }
    function endDraw() {
      drawingRef.current = false;
    }

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", moveDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: true });
    canvas.addEventListener("touchmove", moveDraw, { passive: true });
    canvas.addEventListener("touchend", endDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", moveDraw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", moveDraw);
      canvas.removeEventListener("touchend", endDraw);
    };
  }, [show, revealed]);

  function close() {
    setShow(false);
    localStorage.setItem("sl365_scratch_last_shown", new Date().toDateString());
  }

  return (
    <div className={`scratch-overlay${show ? " show" : ""}`}>
      <button className="scratch-close" onClick={close}>
        ✕
      </button>
      <div className="scratch-card-wrap" ref={wrapRef}>
        <div className="scratch-label">🎁 Today&apos;s Surprise</div>
        <div className={`scratch-reveal-content${revealed ? " reveal-pop" : ""}`}>
          <div className="reveal-icon">{content.icon}</div>
          <h3>{content.title}</h3>
          {content.benefits[0] && <p>{content.benefits[0]}</p>}
          <a className="reveal-cta" href={content.applyLink} target="_blank" rel="noopener noreferrer sponsored">
            Apply Now →
          </a>
        </div>
        {!revealed && (
          <>
            <canvas ref={canvasRef} className="scratch-canvas" width={300} height={220} />
            <div className="scratch-hint">👆 Scratch here to reveal</div>
          </>
        )}
        {particles.map((p) => (
          <span
            key={p.id}
            className="burst-particle"
            style={{ ["--dx" as any]: `${p.dx}px`, ["--dy" as any]: `${p.dy}px` }}
          >
            {p.emoji}
          </span>
        ))}
      </div>
      <button className="scratch-skip" onClick={close}>
        Maybe later
      </button>
    </div>
  );
}
