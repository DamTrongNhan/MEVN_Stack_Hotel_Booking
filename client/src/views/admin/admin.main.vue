<template>
    <TheHeader />
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-sm-2 d-none d-sm-flex">
                <a-list bordered class="aList">
                    <template #header>
                        <div class="header-menu">Bảng điều khiển</div>
                    </template>
                    <TheMenu />
                   
                </a-list>
            </div>
            <div class="col-12 col-sm-10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '../../services/user.service';
import TheHeader from "../../components/admin/TheHeader.vue";
import TheMenu from "../../components/admin/TheMenu.vue"
export default {
    data() {
        return {}
    },
    components: {
        TheHeader,
        TheMenu
    },

    watch: {
        $route(to, from) {
            if (
                to.name === "signIn" &&
                to.name === "signUp"
            )
                this.$router.push({ name: "booking" })
        },
    },
    created() {
    },
    async beforeRouteEnter(to, from, next) {
        const token = localStorage.getItem("token_user");
        if (token) {
            try {
                const isAdmin = await userService.checkUser(token);
                if (isAdmin.role !== "admin")
                    location.replace("/");
            } catch (error) {
                console.error(error)
            }
        } else {
            location.replace("/");
        }
        next();
    },
    methods: {

    },
}
</script>

<style scoped>
.aList {
    width: 100%;
}
.header-menu {
    color: black;
    font-size: 20px;
}
.footer-menu {
    text-decoration: none;
    color: black;
    font-size: 20px;
}
</style>