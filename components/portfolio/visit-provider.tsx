"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialVisit,
  visitReducer,
  type VisitState,
  type VisitAction,
} from "@/lib/visit-state";

const VisitContext = createContext<{
  state: VisitState;
  dispatch: Dispatch<VisitAction>;
} | null>(null);
export function VisitProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(visitReducer, initialVisit);
  return (
    <VisitContext.Provider value={{ state, dispatch }}>
      {children}
    </VisitContext.Provider>
  );
}
export function useVisit() {
  const value = useContext(VisitContext);
  if (!value) throw new Error("Portfolio visit controls require VisitProvider");
  return value;
}
