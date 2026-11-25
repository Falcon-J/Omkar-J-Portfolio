"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { formatTime, lightingAt, localMinutes } from "./clock";
import styles from "./proof.module.css";

export default function LivingMapProof() {
  const [liveMinutes, setLiveMinutes] = useState<number | null>(null);
  const [previewMinutes, setPreviewMinutes] = useState<number | null>(null);
  const [timezone, setTimezone] = useState("");
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState<"workshop" | "about">("workshop");
  const [imageFailed, setImageFailed] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (document.hidden) return;
      setLiveMinutes(localMinutes(new Date()));
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    };
    update();
    const timer = window.setInterval(update, 30_000);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
    };
  }, []);

  const minutes = previewMinutes ?? liveMinutes ?? 720;
  const lighting = lightingAt(minutes);
  const openPlace = (destination: "workshop" | "about", button: HTMLButtonElement) => { opener.current = button; setPlace(destination); setOpen(true); };
  const useLive = () => {
    setLiveMinutes(localMinutes(new Date()));
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setPreviewMinutes(null);
  };

  return (
    <div className={styles.proof}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Living map · isolated interaction proof</p>
        <h1>A world to explore.<br />A person to get to know.</h1>
        <p>This scene tests two destinations, readable panels and gradual light. It is a proof of interaction, using concept artwork; final environmental layers and performance measurements remain ahead.</p>
      </header>
      <div className={styles.world} style={{ "--night": lighting.night } as CSSProperties}>
        {imageFailed ? <div className={styles.fallback}>The landscape could not load. You can still open the Workshop using Places below.</div> : <img className={styles.landscape} src="/living-map-concept.png" alt="Illustrated island with a cottage, trail, workshop, reading corner and mailbox" onError={() => setImageFailed(true)} />}
        {!imageFailed && <><div className={styles.night} aria-hidden="true" /><button className={styles.hotspot} type="button" aria-haspopup="dialog" onClick={(event) => openPlace("workshop", event.currentTarget)}><span aria-hidden="true">✦</span> Workshop</button><button className={`${styles.hotspot} ${styles.homeHotspot}`} type="button" aria-haspopup="dialog" onClick={(event) => openPlace("about", event.currentTarget)}>Meet Omkar</button></>}
      </div>
      <div className={styles.tools}>
        <section className={styles.card} aria-labelledby="places-title">
          <p className={styles.eyebrow}>Places</p><h2 id="places-title">Choose a place</h2>
          <p>The same destinations are reachable through landmarks and these ordinary buttons. Other places are outside this proof.</p>
          <button className={styles.button} type="button" aria-haspopup="dialog" onClick={(event) => openPlace("workshop", event.currentTarget)}>Workshop · project stories →</button><button className={styles.secondary} type="button" aria-haspopup="dialog" onClick={(event) => openPlace("about", event.currentTarget)}>Home · meet Omkar →</button>
        </section>
        <section className={styles.card} aria-labelledby="clock-title">
          <p className={styles.eyebrow}>World lighting</p><h2 id="clock-title">{formatTime(minutes)} · {lighting.phase}</h2>
          <p className={styles.clockMode}>{previewMinutes === null ? `Live · ${timezone || "local clock loading"}` : "Preview · live time paused"}</p>
          <label htmlFor="proof-time">Preview a time of day</label>
          <input id="proof-time" type="range" min="0" max="1439" step="1" value={Math.floor(minutes)} aria-valuetext={formatTime(minutes)} onChange={(event) => setPreviewMinutes(Number(event.currentTarget.value))} />
          <div className={styles.clockActions}><span>{formatTime(minutes)}</span><button className={styles.secondary} type="button" onClick={useLive}>Use live time</button></div>
          <p className={styles.small}>Stylized clock lighting, not astronomical sunrise. Preview changes this scene only. Interface colors stay readable independently of world time.</p>
        </section>
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.panel} onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus(); }}>
            <div className={styles.panelHeading}><div><p className={styles.eyebrow}>{place === "workshop" ? "The Workshop" : "At Home"}</p><Dialog.Title className={styles.title}>{place === "workshop" ? "How I build" : "Meet Omkar"}</Dialog.Title></div><Dialog.Close className={styles.secondary}>Close <span aria-hidden="true">×</span></Dialog.Close></div>
            <Dialog.Description className={styles.description}>{place === "workshop" ? "A place for the problem, the decisions and the evidence behind a project." : "An introduction to the person behind the work."}</Dialog.Description>
            {place === "workshop" ? <div className={styles.workbench}>
              <img src="/companions/omkar-workshop.png" alt="" className={styles.character} />
              <div className={styles.blueprint}><p className={styles.eyebrow}>Project story · composition proof</p><h3>From an idea to a reasoned system.</h3><p>Saathi and AtlasPay are the selected project stories. Their detailed content will be connected after this interaction and layout proof is reviewed.</p><ol><li><strong>The problem</strong> — why it matters.</li><li><strong>My role</strong> — the scope of my contribution.</li><li><strong>Decisions</strong> — choices and tradeoffs.</li><li><strong>Evidence</strong> — what was actually verified.</li></ol></div>
            </div> : <div className={`${styles.workbench} ${styles.homeInterior}`}><img src="/companions/omkar-sit.png" alt="" className={styles.character} /><div className={styles.blueprint}><p className={styles.eyebrow}>A little about me</p><h3>Curiosity beyond the screen.</h3><p>Music and dance, cars, sports and stories are places to begin a conversation. Detailed personal stories will use authored content rather than invented favorites.</p><p>This proof reserves space for the seated Omkar and Stella illustration while keeping the text and navigation readable.</p></div></div>}
            <p className={styles.small}>Static character illustration. This proof makes no claims about final animation quality or 60 fps performance.</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
