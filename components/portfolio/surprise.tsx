"use client";

import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Gift, Cookie } from "lucide-react";
import { useVisit } from "./visit-provider";
import { surpriseUnlocked } from "@/lib/visit-state";

function ScratchCard() {
  const { state, dispatch } = useVisit();
  const canvas = useRef<HTMLCanvasElement>(null);
  const previous = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (!context || state.revealed) return;
    context.fillStyle = "#d8c8ec";
    context.fillRect(0, 0, 600, 900);
    context.strokeStyle = "#a78ac7";
    context.lineWidth = 5;
    context.strokeRect(20, 20, 560, 860);
    context.fillStyle = "#392b46";
    context.font = "600 32px Arial";
    context.textAlign = "center";
    context.fillText("A little surprise", 300, 540);
    context.font = "24px Arial";
    context.fillText("Scratch here or reveal below", 300, 585);
    context.fillStyle = "#9273b1";
    for (const [x, y] of [
      [220, 350],
      [270, 315],
      [330, 315],
      [380, 350],
    ]) {
      context.beginPath();
      context.ellipse(x, y, 22, 29, 0, 0, Math.PI * 2);
      context.fill();
    }
    context.beginPath();
    context.ellipse(300, 410, 57, 43, 0, 0, Math.PI * 2);
    context.fill();
  }, [state.revealed]);
  function scratch(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const point = {
      x: ((event.clientX - rect.left) * 600) / rect.width,
      y: ((event.clientY - rect.top) * 900) / rect.height,
    };
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = 65;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(
      previous.current?.x ?? point.x,
      previous.current?.y ?? point.y,
    );
    context.lineTo(point.x, point.y);
    context.stroke();
    previous.current = point;
  }
  function finish() {
    previous.current = null;
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    const pixels = context.getImageData(0, 0, 600, 900).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 32) if (pixels[i] === 0) clear++;
    if (clear / (pixels.length / 32) > 0.45) dispatch({ type: "reveal" });
  }
  return (
    <>
      <div className="scratch-card">
        <img
          src="/stella-surprise.jpg"
          alt={state.revealed ? "Omkar and Stella together" : ""}
          aria-hidden={!state.revealed}
        />
        {!state.revealed && (
          <canvas
            ref={canvas}
            width={600}
            height={900}
            aria-hidden="true"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              scratch(event);
            }}
            onPointerMove={scratch}
            onPointerUp={finish}
            onPointerCancel={finish}
          />
        )}
      </div>
      {state.revealed ? (
        <p role="status">Meet Stella. Thanks for keeping us company.</p>
      ) : (
        <button
          className="button primary"
          onClick={() => dispatch({ type: "reveal" })}
        >
          Reveal image
        </button>
      )}
    </>
  );
}

export function SurpriseControl() {
  const { state } = useVisit();
  const unlocked = surpriseUnlocked(state);
  return (
    <div className="surprise-control">
      <span
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Stella's treats: ${state.collected.length} of 4${unlocked ? ". Surprise ready" : ""}`}
      >
        <Cookie size={21} /> {state.collected.length} / 4 treats
      </span>
      {unlocked ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="text-button">
              <Gift size={16} />
              Open surprise
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="portfolio-overlay" />
            <Dialog.Content className="portfolio-dialog surprise-dialog">
              <Dialog.Title>A little surprise from Stella.</Dialog.Title>
              <Dialog.Description>
                Four chapters, four treats. Scratch the card or reveal it with
                one tap.
              </Dialog.Description>
              <ScratchCard />
              <Dialog.Close
                className="dialog-close"
                aria-label="Close surprise"
              >
                <X size={20} />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </div>
  );
}
