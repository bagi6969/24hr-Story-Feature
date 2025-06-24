export type StoryAction =
  | { type: "ADD"; payload: string }
  | { type: "SET"; payload: string[] };

export function storyReducer(state: string[], action: StoryAction): string[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    default:
      return state;
  }
}
