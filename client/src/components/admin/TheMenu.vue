<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="admin-users">
            <router-link :to="{ name: 'admin-users' }">
                <span>Tài khoản</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-room">
            <router-link :to="{ name: 'admin-room' }">
                <span>Quản lí phòng</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-booking">
            <router-link :to="{ name: 'admin-booking' }">
                <span>Quản lí đặt phòng</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-photos">
            <router-link :to="{ name: 'admin-photos' }">
                <span>Quản lí photos</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-history">
            <router-link :to="{ name: 'admin-history' }">
                <span>Lịch sử</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-feedback">
            <router-link :to="{ name: 'admin-feedback' }">
                <span>Feedback</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-settings">
            <router-link :to="{ name: 'admin-settings' }">
                <span>Cài đặt</span>
            </router-link>
        </a-menu-item>
        <a-menu-item>
            <router-link class="footer-menu" :to="{ name: 'booking' }">
                <i class="fa-solid fa-arrow-left fa-lg me-2"></i>
                <span>
                    Go Home Page
                </span>
            </router-link>
        </a-menu-item>

    </a-menu>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useMenu } from "../../store/use-menu";
export default {
    data() {
        const menu = useMenu()
        return { ...storeToRefs(menu) }
    }
};
</script>

<style scoped>
* {
    text-decoration: none;
}
</style>