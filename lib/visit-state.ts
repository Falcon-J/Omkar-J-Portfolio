export const treatIds = ["about", "journey", "projects", "now"] as const;
export type TreatId = (typeof treatIds)[number];
export type VisitState = {
  collected: TreatId[];
  guideHidden: boolean;
  guidePaused: boolean;
  projectIndex: number;
  revealed: boolean;
};
export const initialVisit: VisitState = {
  collected: [],
  guideHidden: false,
  guidePaused: false,
  projectIndex: 0,
  revealed: false,
};
export type VisitAction =
  | { type: "collect"; id: TreatId }
  | { type: "toggle-guide" }
  | { type: "pause-guide"; paused: boolean }
  | { type: "select-project"; index: number }
  | { type: "reveal" };
export const surpriseUnlocked = (state: VisitState) =>
  treatIds.every((id) => state.collected.includes(id));

export function visitReducer(
  state: VisitState,
  action: VisitAction,
): VisitState {
  switch (action.type) {
    case "collect":
      return !treatIds.includes(action.id) ||
        state.collected.includes(action.id)
        ? state
        : { ...state, collected: [...state.collected, action.id] };
    case "toggle-guide":
      return { ...state, guideHidden: !state.guideHidden };
    case "pause-guide":
      return { ...state, guidePaused: action.paused };
    case "select-project":
      return Number.isInteger(action.index) &&
        action.index >= 0 &&
        action.index < 3 &&
        action.index !== state.projectIndex
        ? { ...state, projectIndex: action.index }
        : state;
    case "reveal":
      return surpriseUnlocked(state) ? { ...state, revealed: true } : state;
  }
}
