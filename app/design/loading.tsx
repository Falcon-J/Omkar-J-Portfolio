import { LoaderIllustration } from "./journal-loader";
import styles from "./journal.module.css";

export default function Loading() {
  return <div className={styles.loadingFallback}><LoaderIllustration /></div>;
}
