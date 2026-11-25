import Image from "next/image";
import { arrivalPreview } from "./arrival-preview";
import styles from "./map-arrival.module.css";

export function MapArrival({ ready = false }: { ready?: boolean }) {
  return <div className={styles.arrival} data-ready={ready} aria-hidden="true">
    {/* The embedded preview is visible before network images load. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.art} src={arrivalPreview} alt="" />
    <Image className={styles.art} src="/living-map-concept.png" alt="" width={1900} height={828} sizes="(max-width: 650px) 180vh, 100vw" priority />
    <div className={styles.shade} />
    <div className={styles.copy}><p>Omkar Jawalikar</p><h2>A little world,<br />a few stories.</h2><span>Come on in.</span></div>
  </div>;
}
