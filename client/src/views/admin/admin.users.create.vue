<template>
    <a-card title="Tạo tài khoản" style="width: 100%">
        <Form @submit="submitForm" :validation-schema="userSchema">
            <div class="row">
                <div class="col-12 col-sm-4 card-avatar">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <a-image :src="`/imgPage/users-create.jpg`" />
                        </div>
                        <div class="col-12 d-flex justify-content-center mt-3">
                            <input ref="file" class="form-control" type="file" accept="image/*" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-8 card-form">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Name</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="name" placeholder="Họ tên" />
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Phone</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="phone" placeholder="Số điện thoại" />
                            <ErrorMessage name="phone" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Email</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="email" placeholder="Email" />
                            <ErrorMessage name="email" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Password</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="password" placeholder="Password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>CIC</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="CIC" placeholder="Citizen Identity Card" />
                            <ErrorMessage name="CIC" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Country</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="country" placeholder="Quốc gia" />
                            <ErrorMessage name="country" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>City</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="city" placeholder="Thành phố" />
                            <ErrorMessage name="city" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Address</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" class="form-control" name="address" placeholder="Địa chỉ" />
                            <ErrorMessage name="address" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Role</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field class="form-select" as="select" name="role">
                                <option v-for="role in optionRole" :value="role.value">
                                    {{ role.title }}
                                </option>
                            </Field>
                            <ErrorMessage name=" role" class="error-feedback" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="d-grid col-12 d-sm-flex justify-content-sm-end mx-auto">
                    <button type="submit" class="btn btn-primary mb-3  mb-sm-0 me-0  me-sm-2">Tạo</button>
                    <router-link :to="{ name: 'admin-users' }">
                        <button class="btn btn-outline-danger">Hủy</button>
                    </router-link>
                </div>
            </div>
        </Form>
    </a-card>
</template>

<script>
import { useMenu } from '../../store/use-menu'
import userService from '../../services/user.service'
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    data() {
        const menu = useMenu();
        const userSchema = yup.object().shape({
            name: yup
                .string()
                .min(1, "Ít nhất 1 ký tự")
                .max(50, "Nhiều nhất 10 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .min(8, "Ít nhất 8 ký tự")
                .max(20, "Nhiều nhất 20 ký tự"),
            CIC: yup.string(),
            country: yup.string(),
            city: yup.string(),
            address: yup.string(),
            role: yup.string(),
        });
        return {
            menu,
            optionRole: [{ title: "admin", value: "admin" }, { title: "user", value: "user" }],
            userSchema
        }
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    mounted() {
        this.menu.onSelectedKeys(["admin-users"])
    },
    methods: {
        async submitForm(values, { resetForm }) {
            const formData = new FormData();
            formData.append("data", JSON.stringify(values))
            const file = this.$refs.file.files[0];
            if (file)
                formData.append('file', file);
            try {
                const result = await userService.create(formData);
                await this.alert(result.status, result.message);
            }
            catch (err) {
                console.error(err);
                await this.alert(err.response.data.status, err.response.data.message);
            }
            resetForm();
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
    }
}
</script>

<style scoped>
.error-feedback {
    color: red;
}
.card-avatar{
    font-size: 18px;
    box-shadow: -6px -6px teal;
    padding: 40px;
}
.card-form {
    font-size: 18px;
    box-shadow: 6px 6px teal;
}
</style>