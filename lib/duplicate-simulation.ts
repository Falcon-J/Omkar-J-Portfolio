export type SimulationState = {
  protection: boolean;
  received: number;
  applied: number;
};
export const initialSimulation: SimulationState = {
  protection: false,
  received: 0,
  applied: 0,
};
export type SimulationAction =
  | { type: "send" }
  | { type: "protection"; enabled: boolean }
  | { type: "reset" };
export function simulationReducer(
  state: SimulationState,
  action: SimulationAction,
): SimulationState {
  switch (action.type) {
    case "send":
      return {
        ...state,
        received: state.received + 1,
        applied:
          state.protection && state.received > 0
            ? state.applied
            : state.applied + 1,
      };
    case "protection":
      return { protection: action.enabled, received: 0, applied: 0 };
    case "reset":
      return { ...initialSimulation, protection: state.protection };
  }
}
