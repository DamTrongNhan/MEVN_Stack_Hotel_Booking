<template>
    <TheHeader />
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-sm-3 d-none d-sm-flex">
                <a-list bordered class="aList">
                    <TheMenu />
                    <template #header>
                        <div>Bảng điều khiển</div>
                    </template>
                </a-list>
            </div>
            <div class="col-12 col-sm-9">
                <router-view :user="user"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '../../services/user.service';
import TheHeader from "../../components/customer/TheHeader.vue";
import TheMenu from "../../components/customer/TheMenu.vue"
export default {
    data() {
        return { user: {} }
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
                this.$router.push({ name: "main" })
        },
    },
    methods: {
        async getUser(idUser) {
            try {
                const result = await userService.getOne(idUser)
                this.user = result.user;
            }
            catch (err) {
                console.error(err);
            }
        }
    },
    async created() {
        const token = localStorage.getItem("token_user");
        if (token) {
            try {
                const result = await userService.checkUser(token);
                if (result.role === "user")
                    await this.getUser(result.id)
            } catch (error) {
                console.error(error)
            }
        }
    },
    async beforeRouteEnter(to, from, next) {
        const token = localStorage.getItem("token_user");
        if (token) {
            try {
                const result = await userService.checkUser(token);
                if (result.role !== "user")
                    location.replace("/signIn")
            } catch (error) {
                console.error(error)
            }
        } else {
            location.replace("/signIn");
        }
        next();
    },

}
</script>

<style scoped>
.aList {
    width: 100%;
}
</style>