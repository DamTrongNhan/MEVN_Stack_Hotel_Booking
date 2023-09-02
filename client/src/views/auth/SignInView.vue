<template>
    <div class="container-fluid p-0">
        <div class="d-flex justify-content-center p-3 gap-5">
            <div class="">
                <img src="/imgPage/login.jpg" alt="" class="login-img">
            </div>
            <div class="d-flex rounded justify-content-center align-items-center flex-column login">
                <h3 class="login-title">
                    Login
                </h3>
                <div class="w-100 px-5">
                    <div class="d-flex align-items-start flex-column">
                        <Form @submit='signIn' :validation-schema="formSchema" class="w-100">
                            <div class="form-outline mb-3">
                                <label for="email" class="mb-1">Email</label>
                                <Field v-model="admin.email" type="text" name="email" class="form-control"
                                    placeholder="Nhập email của bạn" />

                                <ErrorMessage name="email" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-3">
                                <label for="password" class="mb-1">Password</label>
                                <Field v-model="admin.password" type="password" name="password" class="form-control"
                                    placeholder="Nhập mật khẩu của bạn" />

                                <ErrorMessage name="password" class="error-feedback" />
                            </div>
                            <div class="d-flex align-items-start flex-column">
                                <button class="btn btn-outline-info">Forgot password?</button>
                                <button type="submit" class="btn btn-success mt-4 w-100">Log in</button>
                            </div>
                        </Form>
                        <button class="btn btn-outline-primary w-100 mt-4" role="button">
                            <i class="fa-brands fa-facebook me-3"></i>Login with Facebook
                        </button>
                        <button class="btn btn-outline-danger w-100 mt-4" role="button">
                            <i class="fa-brands fa-google me-3"></i>Login with Google</button>

                        <router-link :to="{ name: 'signUp' }" class="btn btn-outline-primary w-100 mt-4">
                            Create account</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import * as yup from "yup";
import userService from "../../services/user.service";
import { useAuthStore } from '../../store/use-auth'
import { Form, Field, ErrorMessage, useIsFormTouched } from "vee-validate";
export default {
    components: { Form, Field, ErrorMessage },
    watch: {

    },
    data() {
        const authStore = useAuthStore()
        const formSchema = yup.object().shape({
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự.")
                .required("Email phải có giá trị."),
            password: yup
                .string()
                .min(8, "Mật khẩu có ít nhất 8 ký tự")
                .max(50, "Mật khẩu có tối đa 20 ký tự.")
                .required("Password phải có giá trị"),
        });
        return {
            formSchema,
            authStore,
            admin: {}
        };
    },
    methods: {
        async signIn(values, { resetForm }) {
            values = { ...values, role: "admin" }
            const login = await this.authStore.login(values)
            console.log(login);
            if (login.status) {
                if (login.checkAdmin) {
                    await this.alert(login.status, login.message);
                    this.$router.push({ name: "admin-home" });
                } else {
                    await this.alert(login.status, login.message);
                    this.$router.push({ name: "customer-home" });
                }
            }
            else { await this.alert(login.status, login.message); resetForm() }
        },
        async alert(status, message) {
            const option = {
                icon: status ? "success" : "error",
                text: message,
                showConfirmButton: false,
                timer: 1000,
            };
            return await this.$swal(option);
        },
    },
    async mounted() {
        try {
            const token = localStorage.getItem("token_user");
            if (token) {
                const result = await userService.checkUser(token);
                if (result.role === "admin")
                    location.replace("/admin")
                if (result.role === "user")
                    location.replace("/customer")
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
</script>

<style scoped>
.container-fluid {
    height: 100vh;
}

.login {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    width: 500px;
    height: 650px;
}

.login-img {
    width: 700px;
    height: 650px;
}

.login-title {
    font-size: 40px;
    color: #198754;
}

.error-feedback {
    color: red;
}
</style>