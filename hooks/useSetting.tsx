import {create} from "zustand";

interface SettingState{
    isOpen : boolean;
    openSetting : () => void;
    closeSetting : () => void;
}

export const useSetting = create<SettingState>((set) => ({
    isOpen: false,
    openSetting: () => set({ isOpen: true }),
    closeSetting: () => set({ isOpen: false }),
}));
