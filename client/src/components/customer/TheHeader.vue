<template>
    <div class="container-fluid">
        <div class="row text-white align-items-center header">
            <div class="col-1 d-sm-none d-flex align-items-center justify-content-center">
                <span @click="showDrawer()"><i class="fa-solid fa-bars"></i></span>
            </div>
            <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
                <i class="fa-solid fa-user-tie fa-2xl ms-3 me-3"></i>
                <span class="d-none d-sm-flex">Customer</span>
            </div>
            <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
                <i @click="logout()" class="fa-solid fa-right-from-bracket fa-2xl"></i>
            </div>
            <div class="col-1 d-sm-none d-flex align-items-center justify-content-center">
                <span @click="showDrawerUser()"><i class="fa-solid fa-user"></i></span>
            </div>
        </div>
    </div>
    <a-drawer v-model:visible="visible" title="Danh muc" placement="left">
        <TheMenu />
    </a-drawer>
    <a-drawer v-model:visible="visible_user" title="Admin" placement="right">
        <TheMenu />
    </a-drawer>
</template>

<script>
import { useAuthStore } from '../../store/use-auth'
import TheMenu from "./TheMenu.vue"
export default {
    components: {
        TheMenu
    },
    data() {
        const authStore = useAuthStore();
        return {
            visible: false,
            visible_user: false,
            authStore,
        }
    },
    methods: {
        logout() {
            this.authStore.logout();
            location.reload();
        },
        showDrawer() {
            this.visible = true;
        },
        showDrawerUser() {
            this.visible_user = true;
        },

    }
};
</script>

<style scoped>
.header {
    background-color: #0c713d;
    padding: 1rem;
}
</style>