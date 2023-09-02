<template>
    <a-card title="Chỉnh sửa thông tin tài khoản" style="width: 100%">
        <Form @submit="submitForm" :validation-schema="userSchema">
            <div class="row">
                <div class="col-12 col-sm-4 card-avatar">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <a-image v-if="!userEdit.avatar" :width="300" :src="`/imgPage/users-create.jpg`" />
                            <a-image v-else :width="300" :src="`http://localhost:3000/assets/uploads/${userEdit.avatar}`" />
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
                            <Field type="text" v-model="userEdit.name" class="form-control" name="name"
                                placeholder="Họ tên" />
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
                            <Field type="text" v-model="userEdit.phone" class="form-control" name="phone"
                                placeholder="Số điện thoại" />
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

                            <Field type="text" v-model="userEdit.email" class="form-control" name="email"
                                placeholder="Email" />
                            <ErrorMessage name="email" class="error-feedback" />

                        </div>
                    </div>
                    <!-- <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Password</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" v-model="userEdit.password" class="form-control" name="password"
                                placeholder="Password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                    </div> -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>CIC</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <Field type="text" v-model="userEdit.CIC" class="form-control" name="CIC"
                                placeholder="Citizen Identity Card" />
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
                            <Field type="text" v-model="userEdit.country" class="form-control" name="country"
                                placeholder="Quốc gia" />
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
                            <Field type="text" v-model="userEdit.city" class="form-control" name="city"
                                placeholder="Thành phố" />
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
                            <Field type="text" v-model="userEdit.address" class="form-control" name="address"
                                placeholder="Địa chỉ" />
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
                            <Field class="form-select" v-model="userEdit.role" as="select" name="role">
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
                    <button type="submit" class="btn btn-primary mb-3  mb-sm-0 me-0  me-sm-2">Lưu</button>
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
            userEdit: {},
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
    props: { id: { type: String, require: true } },
    async mounted() {
        this.menu.onSelectedKeys(["admin-users"])
        this.refresh()
    },
    methods: {
        async refresh() {
            try {
                const result = await userService.getOne(this.id)
                this.userEdit = result.user;
            }
            catch (err) {
                console.error(err);
            }
        },
        async submitForm(values, { resetForm }) {
            const formData = new FormData();
            formData.append("data", JSON.stringify(values))
            const file = this.$refs.file.files[0];
            if (file)
                formData.append('file', file);
            try {
                const result = await userService.update(this.id, formData);
                await this.alert(result.status, result.message);
                this.refresh()
            }
            catch (err) {
                console.error(err);
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
.card-avatar {
    font-size: 18px;
    box-shadow: -6px -6px teal;
    padding: 40px;
}

.card-form {
    font-size: 18px;
    box-shadow: 6px 6px teal;
    padding: 40px;
}

.error-feedback {
    color: red;
}
</style>