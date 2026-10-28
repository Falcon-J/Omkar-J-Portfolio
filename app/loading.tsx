import styles from "@/components/living-map/map-shell.module.css";
import { MapArrival } from "@/components/living-map/map-arrival";
export default function Loading() {
  return <main aria-busy="true" style={{ minHeight: "100dvh", background: "#ffe4bc" }}><MapArrival /><p className={styles.visuallyHidden}>Opening Omkar’s illustrated world…</p></main>;
}
