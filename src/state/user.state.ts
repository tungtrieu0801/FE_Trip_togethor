import { create } from "zustand";

export const userState = create(set => ({
    currentUserId: null,
    setCurrentUserId: (id: string) => set({ currentUserId:id })
}))