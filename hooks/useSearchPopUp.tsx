import {create} from "zustand";

interface SearchPopupState{
    isOpen : boolean;
    openPopup : () => void;
    closePopup : () => void;
}

export const useSearchPopUp = create<SearchPopupState>((set) => ({
    isOpen : false,
    openPopup : () => set({isOpen : true}),
    closePopup : () => set({isOpen : false}),
}));