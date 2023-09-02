<template>
    <div class="container-fluid p-0">
        <div class="d-flex justify-content-center gap-5 p-3">
            <div class="">
                <img src="/imgPage/signUp.avif" alt="" class="login-img">
            </div>
            <div class="d-flex rounded justify-content-center align-items-center flex-column sign-up">
                <h3 class="login-title">
                    Sign Up
                </h3>
                <div class="w-100 px-5">
                    <div class="d-flex align-items-start flex-column">
                        <Form @submit='signUp' :validation-schema="formSchema" class="w-100">
                            <div class="form-outline mb-3">
                                <label for="email" class="mb-1">Email</label>
                                <Field type="text" name="email" class="form-control" placeholder="Nhập email của bạn" />
                                <ErrorMessage name="email" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-3">
                                <label for="password" class="mb-1">Password</label>
                                <Field type="password" name="password" class="form-control"
                                    placeholder="Nhập mật khẩu của bạn" />
                                <ErrorMessage name="password" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-3">
                                <label for="confirmPass" class="mb-1">Confirm Password</label>
                                <Field type="password" name="confirmPass" class="form-control"
                                    placeholder="Xác nhận mật khẩu" />
                                <ErrorMessage name="confirmPass" class="error-feedback" />
                            </div>
                            <div class="d-flex align-items-start flex-column">
                                <button type="submit" class="btn btn-success mt-4 w-100">Register</button>
                            </div>
                        </Form>
                        <button class="btn btn-outline-primary w-100 mt-4" role="button">
                            <i class="fa-brands fa-facebook me-3"></i>Login with Facebook
                        </button>
                        <button class="btn btn-outline-danger w-100 mt-4" role="button">
                            <i class="fa-brands fa-google me-3"></i>Login with Google</button>

                        <router-link :to="{ name: 'signIn' }" class="btn btn-outline-success mt-4 w-100">
                            Already have an account? Login </router-link>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import { useAuthStore } from '../../store/use-auth'
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: { Form, Field, ErrorMessage },
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
            confirmPass: yup
                .string()
                .min(8, "Mật khẩu có ít nhất 8 ký tự")
                .max(50, "Mật khẩu có tối đa 20 ký tự.")
                .oneOf([yup.ref("password"), null], "Xác nhận phải trùng password đã nhập")
                .required("Password phải có giá trị")
        });
        return {
            formSchema,
            authStore
        };
    },
    methods: {
        async signUp(values, { resetForm }) {
            const signUp = await this.authStore.signUp(values);
            await this.alert(signUp.status, signUp.message);
            if (signUp.status) this.$router.push({ name: "signIn" });
            else resetForm();
        },
        async alert(status, message) {
            const option = {
                icon: status ? "success" : "error",
                text: message,
                showConfirmButton: false,
                timer: 2000,
            };
            return await this.$swal(option);
        },
    }
}
</script>

<style scoped>
.sign-up {
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