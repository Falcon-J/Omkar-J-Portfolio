"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./journal.module.css";

export function LoaderIllustration() {
  return <><Image className={styles.loaderImage} src="/stella.jpg" alt="Omkar and Stella, illustrated together" width={213} height={320} priority /><p className={styles.loaderLabel} role="status">A moment with Stella…</p></>;
}

export function JournalLoader() {
  const [loading, setLoading] = useState(false);
  const previousFocus = useRef<Element | null>(null);

  useEffect(() => {
    // A cached page needs no artificial delay; the portfolio remains server rendered.
    if (document.readyState === "complete") return;
    previousFocus.current = document.activeElement;
    setLoading(true);
    const finish = () => setLoading(false);
    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  if (!loading) return null;
  return <Dialog.Root open={loading} onOpenChange={setLoading}><Dialog.Portal><Dialog.Content className={`${styles.journal} ${styles.loader}`} aria-describedby={undefined} onCloseAutoFocus={event => {
    event.preventDefault();
    const target = previousFocus.current;
    if (target instanceof HTMLElement && target.isConnected && target !== document.body) target.focus();
    else document.querySelector<HTMLAnchorElement>('a[href="/design#journal-content"]')?.focus();
  }}><Dialog.Title className="sr-only">Loading portfolio</Dialog.Title><LoaderIllustration /><Dialog.Close className={styles.loaderDismiss}>Continue to portfolio ↗</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
