<template>
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col-sm-4">
                <div class="row">
                    <p class="col-12">
                        <i class="fa-solid fa-envelope me-2"></i>
                        (+84) 082 938 8509
                    </p>
                    <p class="col-12">
                        <i class="fa-solid fa-phone me-2"></i>
                        nhanb1910113@student.ctu.edu.vn
                    </p>
                </div>

            </div>
            <div class="col-sm-4 d-flex justify-content-center align-items-center flex-column">
                <router-link :to="{ name: 'booking' }">
                    <img src="/imgPage/logoNodeHome.png" alt="">
                </router-link>
                <span class="brand">NodeHome</span>
            </div>

            <div class="col-sm-4 d-flex align-items-center justify-content-end gap-3" v-if="checkSignIn === false">
                <router-link :to="{ name: 'signIn' }" class="btn btn-outline-light px-5 border border-2">
                    Đăng nhập
                </router-link>
                <router-link :to="{ name: 'signUp' }" class="btn btn-outline-light px-5 border border-2">
                    Đăng ký
                </router-link>
            </div>
            <div v-else class="col-sm-4 d-flex align-items-center justify-content-end gap-3">
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-light border border-2 dropdown-toggle px-3 "
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-regular fa-user pe-2"></i>
                        <span class="me-2">
                            {{ userName }}
                        </span>
                    </button>
                    <ul class="dropdown-menu w-100">
                        <button @click="logout()" class="dropdown-item">Logout</button>
                        <button class="dropdown-item">Action</button>
                    </ul>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-light border border-2 dropdown-toggle px-5"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-shield-halved pe-2"></i>
                        <span class="me-2">
                            {{ userRole }}
                        </span>
                    </button>
                    <ul class="dropdown-menu w-100">
                        <button @click="goAdmin()" class="dropdown-item">Đến trang quản trị</button>
                        <button class="dropdown-item">Action</button>
                    </ul>
                </div>
            </div>

        </div>
        <div class="d-flex mt-4 align-items-center justify-content-center gap-4">
            <router-link :to="{ name: 'image' }" class="nav-btn">
                <span class="">Image</span>
            </router-link>
            <router-link :to="{ name: 'about' }" class="nav-btn">
                <span class="">About us</span>
            </router-link>
            <router-link :to="{ name: 'booking' }" class="nav-btn">
                <span class="">Booking</span>
            </router-link>
            <span class="nav-btn">Rooms</span>
        </div>
    </div>
</template>

<script>
import { toHandlers } from 'vue';
import userService from '../../services/user.service';
import { useAuthStore } from '../../store/use-auth'
export default {
    data() {
        const authStore = useAuthStore();
        return { authStore, userName: null, userRole: null, checkSignIn: false }
    },
    methods: {
        goAdmin() {
            if (this.userRole === "admin") {
                this.$router.push({
                    name: "admin-home",
                });
            }
            else {
                this.$router.push({
                    name: "customer-main",
                });
            }
        },
        async logout() {
            this.authStore.logout();
            location.reload();
        },
    },
    async mounted() {
        const token = localStorage.getItem("token_user");
        if (token) {
            try {
                const result = await userService.checkUser(token);
                if (result) {
                    this.userName = result.name;
                    this.userRole = result.role;
                    this.checkSignIn = true
                }
                else this.checkSignIn = false
            }
            catch (err) {
                console.error(err);
            }
        }
        else this.checkSignIn = false
    },
}
</script>

<style scoped>
.container-fluid {
    background: url(/imgPage/bg-Header.jpg) no-repeat center top;
    background-size: cover;
    height: 500px;
    padding: 130px 50px;
}

.brand {
    font-size: 40px;
    color: white;
    font-family: Georgia, 'Times New Roman', Times, serif;
}

p {
    margin: 0;
    color: white;
}

img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
}

.nav-btn {
    padding: 5px 40px;
    background-color: #0c713d;
    border: 2px solid white;
    color: white;
    font-weight: bold;
    transition: all 0.2s linear;
    box-sizing: border-box;
    font-size: 20px;
    text-decoration: none;
    box-shadow: 6px 6px white;
    cursor: pointer;
    border: none;
}

.nav-btn:active {
    box-shadow: none;
    transform: translate(4px, 4px);
}
</style>