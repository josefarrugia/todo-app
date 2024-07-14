import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    status: false,
    message: ''
  }),

  getters: {
    getStatus: (state) => state.status,
    getMessage: (state) => state.message
  },

  actions: {
    showToast(message: string) {
      this.status = true;
      this.message = message;

      // Hide Toast Notification
      setTimeout(() => {
        this.status = false;
      }, 1000);
    }
  }
});
