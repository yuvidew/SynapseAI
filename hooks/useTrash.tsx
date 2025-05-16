import {create} from 'zustand'

interface TrashState {
    isOpen: boolean;
    openTrash: () => void;
    closeTrash: () => void;
}

export const useTrash = create<TrashState>((set) => ({
    isOpen: false,
    openTrash: () => set({ isOpen: true }),
    closeTrash: () => set({ isOpen: false }),
}));
