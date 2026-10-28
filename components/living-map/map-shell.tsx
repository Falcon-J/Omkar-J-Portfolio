"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { DestinationContent, type MapPlace } from "./destinations";
import { MapArrival } from "./map-arrival";
import { hashForPlace, lightingAt, localMinutes, mapLocationFromHash, sceneAt, type MapDetail } from "./map-state";
import styles from "./map-shell.module.css";

const places: { id: MapPlace; label: string; subtitle: string; x: number; y: number; width: number; height: number }[] = [
  { id: "home", label: "Home", subtitle: "Meet the person", x: 18, y: 21, width: 17, height: 29 },
  { id: "journey", label: "Journey", subtitle: "Follow the path", x: 40, y: 18, width: 14, height: 26 },
  { id: "workshop", label: "Workshop", subtitle: "Explore the work", x: 57, y: 44, width: 20, height: 26 },
  { id: "now", label: "Reading corner", subtitle: "What's on my mind", x: 14, y: 65, width: 19, height: 30 },
  { id: "contact", label: "Mailbox", subtitle: "Start a conversation", x: 80, y: 68, width: 10, height: 20 },
];

export function LivingMap() {
  const [place, setPlace] = useState<MapPlace | null>(null);
  const lastPlace = useRef<MapPlace>("home");
  const [detail, setDetail] = useState<MapDetail | null>(null);
  const destinationHeading = useRef<HTMLHeadingElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const placesTrigger = useRef<HTMLButtonElement>(null);
  const scenePlacesTrigger = useRef<HTMLButtonElement>(null);
  const placesMenu = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapPanned, setMapPanned] = useState(false);
  const [landmarkDiscovered, setLandmarkDiscovered] = useState(false);
  const [liveMinutes, setLiveMinutes] = useState<number | null>(null);
  const [lightingDuration, setLightingDuration] = useState("180ms");
  const [imageFailed, setImageFailed] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [nightRequested, setNightRequested] = useState(false);
  const [nightReady, setNightReady] = useState(false);
  const [nightFailed, setNightFailed] = useState(false);
  const [sceneRequested, setSceneRequested] = useState({ sunrise: false, moonrise: false });
  const [sceneReady, setSceneReady] = useState({ sunrise: false, moonrise: false });
  const [sceneFailed, setSceneFailed] = useState({ sunrise: false, moonrise: false });
  const [pageVisible, setPageVisible] = useState(true);
  const [sceneVisible, setSceneVisible] = useState(true);
  const worldElement = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const readLocation = () => {
      const location = mapLocationFromHash(window.location.hash);
      setMenuOpen(false);
      setDetail(location.detail);
      if (location.place) lastPlace.current = location.place;
      setPlace(location.place);
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    window.addEventListener("hashchange", readLocation);
    return () => { window.removeEventListener("popstate", readLocation); window.removeEventListener("hashchange", readLocation); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      const trigger = place ? scenePlacesTrigger.current : placesTrigger.current;
      if (target && !placesMenu.current?.contains(target) && !trigger?.contains(target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [menuOpen, Boolean(place)]);
  useEffect(() => {
    const update = (gradual = false) => {
      setPageVisible(!document.hidden);
      if (document.hidden) return;
      setLightingDuration(gradual ? "30s" : "180ms");
      setLiveMinutes(localMinutes(new Date()));
    };
    update();
    const resync = () => update();
    const timer = window.setInterval(() => update(true), 30_000);
    document.addEventListener("visibilitychange", resync);
    window.addEventListener("focus", resync);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", resync); window.removeEventListener("focus", resync); };
  }, []);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (place && !element.open) element.showModal();
    if (!place && element.open) {
      element.close();
      const target = opener.current?.isConnected ? opener.current : placesTrigger.current;
      target?.focus({ preventScroll: true });
    }
  }, [place]);
  useEffect(() => {
    if (!place || !dialog.current) return;
    dialog.current.scrollTop = 0;
    const target = detail ? dialog.current.querySelector<HTMLElement>("[data-detail-heading]") : destinationHeading.current;
    target?.focus({ preventScroll: true });
  }, [place]);
  useEffect(() => {
    if (!place) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [Boolean(place)]);
  const navigate = (next: MapPlace, button?: HTMLElement) => {
    if (button) opener.current = button;
    setLandmarkDiscovered(true); setMapPanned(true);
    setDetail(null);
    const hash = hashForPlace(next);
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    lastPlace.current = next; setPlace(next); setMenuOpen(false);
  };
  const changeDetail = (next: MapDetail | null) => {
    setMenuOpen(false);
    if (!place || detail === next) return;
    const hash = hashForPlace(place, next);
    if (next) window.history.pushState({ livingMapParent: window.location.hash }, "", hash);
    else if (window.history.state?.livingMapParent === hash) { window.history.back(); return; }
    else window.history.replaceState(null, "", hash);
    setDetail(next);
  };
  const openSkills = (button: HTMLElement) => {
    opener.current = button;
    if (window.location.hash !== "#skills") window.history.pushState(null, "", "#skills");
    lastPlace.current = "workshop"; setDetail("toolkit"); setPlace("workshop"); setMenuOpen(false);
  };
  const close = () => {
    setMenuOpen(false);
    if (!place) return;
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    setPlace(null); setDetail(null);
  };
  const dismissTopLayer = () => {
    if (menuOpen) { setMenuOpen(false); scenePlacesTrigger.current?.focus(); }
    else if (detail) changeDetail(null);
    else close();
  };
  const minutes = liveMinutes ?? 720;
  const lighting = lightingAt(minutes);
  const scene = sceneAt(minutes);
  useEffect(() => {
    setSceneRequested((previous) => {
      const sunrise = previous.sunrise || scene.weights.sunrise > 0;
      const moonrise = previous.moonrise || scene.weights.moonrise > 0;
      return sunrise === previous.sunrise && moonrise === previous.moonrise ? previous : { sunrise, moonrise };
    });
  }, [scene.weights.sunrise, scene.weights.moonrise]);
  useEffect(() => { if (lighting.lamps > 0) setNightRequested(true); }, [lighting.lamps]);
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !worldElement.current) return;
    const observer = new IntersectionObserver(([entry]) => setSceneVisible(entry.isIntersecting));
    observer.observe(worldElement.current);
    return () => observer.disconnect();
  }, []);
  const active = places.find((item) => item.id === place);
  const mapTheme = lighting.lamps >= 0.5 ? "night" : "day";
  const exploreMenu = menuOpen && <nav ref={placesMenu} className={styles.placesMenu} id="map-places-menu" aria-label="Explore" onKeyDown={(event) => {
      const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a"));
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      event.preventDefault(); items[next]?.focus();
    }}>
          {places.map((item) => <button type="button" key={item.id} aria-current={place === item.id ? "location" : undefined} onClick={(event) => navigate(item.id, event.currentTarget)}>{item.label}<small>{item.subtitle}</small></button>)}
          <button type="button" onClick={(event) => openSkills(event.currentTarget)}>Technical toolkit<small>Tools and topics</small></button>
          <a className={styles.menuResume} href="/Omkar-Jawalikar-Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Résumé <span aria-hidden="true">↗</span><small>Open the PDF</small></a>
        </nav>;
  return (
    <main className={styles.shell} id="main-content" data-map-theme={mapTheme} onKeyDown={(event) => {
      if (event.key !== "Escape" || !menuOpen) return;
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat) { setMenuOpen(false); placesTrigger.current?.focus(); }
    }}>
      <a href="#places-control" className={styles.skip}>Skip to Explore control</a>
      <h1 className={styles.visuallyHidden}>Omkar Jawalikar — explore my world</h1>
      <header className={styles.header} aria-label="Map controls" hidden={Boolean(place)}>
        <div className={styles.headerActions}>
          <button className={styles.control} id="places-control" type="button" ref={placesTrigger} aria-expanded={menuOpen} aria-controls="map-places-menu" onClick={() => { setMenuOpen(!menuOpen); }}>Explore <span aria-hidden="true">⌄</span></button>
        </div>
        {!place && exploreMenu}
      </header>
      <MapArrival ready={mapReady || imageFailed} />
      <div ref={worldElement} className={styles.world} aria-label="Explore the illustrated map" onScroll={(event) => { if (event.currentTarget.scrollLeft > 8) setMapPanned(true); }} data-active={pageVisible && sceneVisible && !place} style={{ "--night": lighting.night, "--lamps": lighting.lamps, "--night-art": nightReady && !nightFailed ? lighting.lamps : 0, "--tint": nightReady && !nightFailed ? 0 : lighting.night, "--lighting-duration": lightingDuration } as CSSProperties}>
        <div className={styles.skyDay} style={{ background: scene.sky }} aria-hidden="true" />
        <div className={styles.scene}>
          {!imageFailed ? <>
            <Image className={styles.landscape} src="/living-map-concept.png" alt="A little illustrated world with a home, mountain trail, workshop, reading corner and mailbox" width={1900} height={828} sizes="(max-width: 650px) 180vh, 100vw" priority onLoad={() => setMapReady(true)} onError={() => setImageFailed(true)} />
            {nightRequested && !nightFailed && <Image className={`${styles.landscape} ${styles.nightLandscape}`} src="/living-map-night.png" alt="" width={1900} height={828} sizes="(max-width: 650px) 180vh, 100vw" loading="eager" onLoad={() => setNightReady(true)} onError={() => setNightFailed(true)} />}
            {(["sunrise", "moonrise"] as const).map((key) => sceneRequested[key] && !sceneFailed[key] && <Image key={key} className={`${styles.landscape} ${styles.phaseLandscape}`} src={`/living-map-${key}.png`} alt="" width={1900} height={828} sizes="(max-width: 650px) 180vh, 100vw" loading="eager" style={{ opacity: sceneReady[key] ? scene.weights[key] : 0 }} onLoad={() => setSceneReady((previous) => ({ ...previous, [key]: true }))} onError={() => setSceneFailed((previous) => ({ ...previous, [key]: true }))} />)}
            <div className={styles.night} aria-hidden="true" /><div className={styles.lampHome} aria-hidden="true" /><div className={styles.lampWorkshop} aria-hidden="true" /><div className={styles.lampReading} aria-hidden="true" />
            <div className={styles.hotspots} aria-label="Map destinations">{places.map((item) => <button type="button" className={styles.hotspot} key={item.id} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, height: `${item.height}%` }} aria-label={`${item.label}: ${item.subtitle}`} aria-haspopup="dialog" onPointerEnter={() => setLandmarkDiscovered(true)} onFocus={() => setLandmarkDiscovered(true)} onClick={(event) => navigate(item.id, event.currentTarget)}><span className={styles.hotspotLabel} aria-hidden="true">{item.label}<small>{item.subtitle}</small></span></button>)}</div>
          </> : <div className={styles.fallback}><h2>The map is taking a little rest.</h2><p>Every story is still available through Explore.</p><button className={styles.control} type="button" onClick={() => { setMenuOpen(true); placesTrigger.current?.focus(); }}>Open Explore</button></div>}
        </div>
      </div>
      {!landmarkDiscovered && <p className={styles.discoveryHint}>Hover a landmark, then click to explore.</p>}
      {!mapPanned && <p className={styles.panHint}>Swipe to explore · or use Explore</p>}
      <noscript><section className={styles.noScript}><h2>Get to know Omkar</h2><p>I’m a software engineer interested in systems, products and the people who use them.</p><p>Projects: <a href="https://github.com/Falcon-J/saathi">Saathi</a> and <a href="https://github.com/Falcon-J/AtlasPay">AtlasPay</a>.</p><p><a href="mailto:omkarjawalikar04@gmail.com">Email me</a> · <a href="https://github.com/Falcon-J">GitHub</a> · <a href="/Omkar-Jawalikar-Resume.pdf">Résumé</a></p><p>Enable JavaScript to explore the map and its stories.</p></section></noscript>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="destination-title" aria-describedby="destination-description" onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault(); event.stopPropagation();
        if (!event.repeat) dismissTopLayer();
      }} onCancel={(event) => {
        event.preventDefault();
        dismissTopLayer();
      }} onClose={() => { if (place) close(); }}>
        <div className={styles.panelFrame}>
          <div className={styles.sceneControls} aria-label="Destination controls">
            <button className={styles.control} type="button" onClick={close} aria-label="Back to map">← <span>Back to map</span></button>
            <button className={styles.control} type="button" ref={scenePlacesTrigger} aria-expanded={menuOpen} aria-controls="map-places-menu" onClick={() => setMenuOpen(!menuOpen)}>Explore <span aria-hidden="true">⌄</span></button>
            {place && exploreMenu}
          </div>
          <h2 className={styles.visuallyHidden} id="destination-title" ref={destinationHeading} tabIndex={-1}>{active?.label ?? places.find(item => item.id === lastPlace.current)?.label}</h2>
          <p id="destination-description" className={styles.visuallyHidden}>Explore this scene, open its stories, or return to the map. Escape returns from a story before leaving the scene.</p>
          <DestinationContent place={place ?? lastPlace.current} detail={detail} active={Boolean(place)} motionActive={pageVisible} onClose={close} onDetailChange={changeDetail} onNavigate={(next) => navigate(next)} />
        </div>
      </dialog>
    </main>
  );
}
