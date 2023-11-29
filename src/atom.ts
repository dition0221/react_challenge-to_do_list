import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[]; // categories
}

export const categoryState = atom<keyof IToDoState>({
  key: "category",
  default: "TO_DO",
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: { TO_DO: [{ id: 1, text: "Made by 'dition0221'." }] },
  effects_UNSTABLE: [persistAtom],
});

// Show 'To-Do List' of category you want
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
