<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="customer-personal">
            <router-link :to="{ name: 'customer-personal' }">
                <span>Thông tin cá nhân</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="customer-settings">
            <router-link :to="{ name: 'customer-settings' }">
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