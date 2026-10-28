import type { ReactNode } from "react";
// The root shell owns navigation and visit state across chapter transitions.
export function PageWrapper({
  children,
}: {
  children: ReactNode;
  backgroundVariant?: "default" | "animated" | "gradient";
}) {
  return <>{children}</>;
}
