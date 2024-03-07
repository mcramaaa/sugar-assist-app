import { create } from "zustand";

interface IUser {
  user: string;
  setUser: (setName: string) => void;
}

export const useUser = create<IUser>((set) => ({
  user: "",
  setUser: (setName: string) => set({ user: setName }),
}));
