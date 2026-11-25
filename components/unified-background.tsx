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

  // Animated background effect
  useEffect(() => {
    if (variant !== "animated" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.001;

      // Use consistent theme-aware colors
      ctx.fillStyle = colors.cream;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hexSize = 20;
      const cols = Math.ceil(canvas.width / (hexSize * 2)) + 2;
      const rows = Math.ceil(canvas.height / (hexSize * 1.7)) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * hexSize * 2 + (j % 2 === 0 ? 0 : hexSize);
          const y = j * hexSize * 1.7;

          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
              Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );

          const opacity = Math.sin(time + distanceFromCenter * 5) * 0.05 + 0.05;
          ctx.strokeStyle = `hsla(${colors.navyHsl}, ${opacity})`;
          ctx.lineWidth = 1;

          drawHexagon(ctx, x, y, hexSize);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, colors, isDark]);

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
