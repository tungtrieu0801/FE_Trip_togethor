import { create } from "zustand";

export const roomState = create(set => ({
    receiverId: null,
    setReceiverId: (id:string) => set({ receiverId: id }),
}))