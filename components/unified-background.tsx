"use client";

import { useEffect, useRef } from "react";
import { useThemeColors } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface UnifiedBackgroundProps {
  variant?: "default" | "animated" | "subtle" | "gradient";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Unified Background Component
 * Provides consistent theming across all pages with optional animations
 */
export function UnifiedBackground({
  variant = "default",
  className,
  children,
}: UnifiedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors, isDark } = useThemeColors();

  // Hexagon drawing function for animated variants
  const drawHexagon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const xPoint = x + size * Math.cos(angle);
      const yPoint = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(xPoint, yPoint);
      else ctx.lineTo(xPoint, yPoint);
    }
    ctx.closePath();
  };

  // Animated background effect: ~30fps, pauses when the tab is hidden,
  // draws a single static frame when the user prefers reduced motion.
  useEffect(() => {
    if (variant !== "animated" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hexSize = 20;
    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let lastFrame = 0;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = colors.cream;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;

      const cols = Math.ceil(width / (hexSize * 2)) + 2;
      const rows = Math.ceil(height / (hexSize * 1.7)) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * hexSize * 2 + (j % 2 === 0 ? 0 : hexSize);
          const y = j * hexSize * 1.7;
          const dx = (x - width / 2) / width;
          const dy = (y - height / 2) / height;
          const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.sin(time + distanceFromCenter * 5) * 0.05 + 0.05;
          ctx.strokeStyle = `hsla(${colors.navyHsl}, ${opacity})`;
          drawHexagon(ctx, x, y, hexSize);
          ctx.stroke();
        }
      }
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (now - lastFrame < 33) return; // ~30fps is plenty for a slow pulse
      time += (now - lastFrame) * 0.00006;
      lastFrame = now;
      draw();
    };

    const start = () => {
      if (reduceMotion || animationFrameId) return;
      lastFrame = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resizeCanvas();
    start();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [variant, colors]);

  const backgroundVariants = {
    default: "bg-portfolio-cream",
    animated: "bg-portfolio-cream",
    subtle:
      "bg-gradient-to-br from-portfolio-cream via-portfolio-surface to-portfolio-surface-elevated",
    gradient:
      "bg-gradient-to-br from-portfolio-cream via-portfolio-surface/50 to-portfolio-beige/30",
  };

  return (
    <div
      className={cn(
        "min-h-screen relative transition-colors duration-300",
        backgroundVariants[variant],
        className
      )}
    >
      {/* Animated Canvas Background */}
      {variant === "animated" && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{ opacity: 0.8 }}
        />
      )}

      {/* Gradient Overlay for enhanced depth */}
      {(variant === "gradient" || variant === "subtle") && (
        <div className="fixed inset-0 -z-10 opacity-30">
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-gradient-to-br from-portfolio-navy/10 via-transparent to-portfolio-beige/5"
                : "bg-gradient-to-br from-portfolio-navy/5 via-transparent to-portfolio-beige/10"
            )}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}

/**
 * Page Background Wrapper
 * Simplified component for basic page backgrounds
 */
export function PageBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <UnifiedBackground
      variant="default"
      className={cn("text-portfolio-almost-black", className)}
    >
      {children}
    </UnifiedBackground>
  );
}

/**
 * Animated Page Background
 * For pages that need visual interest (like contact page)
 */
export function AnimatedPageBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <UnifiedBackground
      variant="animated"
      className={cn("text-portfolio-almost-black", className)}
    >
      {children}
    </UnifiedBackground>
  );
}

/**
 * Gradient Page Background
 * For landing pages and special sections
 */
export function GradientPageBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <UnifiedBackground
      variant="gradient"
      className={cn("text-portfolio-almost-black", className)}
    >
      {children}
    </UnifiedBackground>
  );
}
