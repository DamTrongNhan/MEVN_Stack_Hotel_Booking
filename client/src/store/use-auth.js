import userService from "../services/user.service";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
    user: {},
  }),
  actions: {
    async login(data) {
      try {
        const response = await userService.signIn(data);
        this.$patch((state) => {
          state.isLogin = true;
        });
        localStorage.setItem("token_user", response.data.token);
        return {
          status: true,
          message: response.data.message,
          checkAdmin: response.data.checkAdmin,
        };
      } catch (e) {
        return { status: false, message: e.response.data.message };
      }
    },
    async signUp(data) {
      try {
        const response = await userService.signUp(data);
        return { status: true, message: response.data.message };
      } catch (e) {
        // console.error(e);
        return { status: false, message: e.response.data.message };
      }
    },
    logout() {
      this.$patch((state) => {
        state.isLogin = false;
      });
      localStorage.removeItem("token_user");
      if (localStorage.getItem("idUser")) {
        localStorage.removeItem("idUser");
      }
    },
  },
});
