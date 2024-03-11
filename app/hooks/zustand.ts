import { create } from "zustand";

export interface IUser {
  id?: number;
  name: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export const UserDefaultValue = {
  name: "",
  breakfast: "",
  lunch: "",
  dinner: "",
};

interface IUserHook {
  user: IUser;
  setUser: (setName: IUser) => void;
}

export const useUser = create<IUserHook>((set) => ({
  user: UserDefaultValue,
  setUser: (pUser: IUser) => set({ user: pUser }),
}));
