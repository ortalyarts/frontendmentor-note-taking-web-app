import { create } from 'zustand';

export const useMobileNavigationStore = create((set) => ({
  contentToshow: '',
  setContentToShow: (button) => set({ contentToshow: button }),
}));
