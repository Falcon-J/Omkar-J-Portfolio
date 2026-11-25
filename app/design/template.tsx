import type { ReactNode } from "react";
import styles from "./journal.module.css";

export default function JournalTemplate({ children }: { children: ReactNode }) {
  return <div className={styles.pageTransition}>{children}</div>;
}
