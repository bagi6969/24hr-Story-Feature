import { Story } from "@/app/page";

export type StoryAction =
  | { type: "ADD"; payload: Story }
  | { type: "SET"; payload: Story[] };

export function storyReducer(state: Story[], action: StoryAction): Story[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    default:
      return state;
  }
}
