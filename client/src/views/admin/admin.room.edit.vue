<template>
    <Form @submit="submitForm" ref="form" :validation-schema="roomSchema">
        <a-card title="Chỉnh sửa thông tin phòng" style="width: 100%">
            <div class="row">
                <div class="col-12 col-sm-3 card-image">
                    <div class="row">
                        <h4 class="mb-4">Photos</h4>
                        <div class=" d-flex justify-content-start flex-wrap gap-3">
                            <a-image v-for="(item, index) in roomEdit.photos" :width="300" :key="index"
                                :src="`http://localhost:3000/assets/uploads/${item.name}`" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-9 card-form">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Số phòng</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.roomNumber" type="text" class="form-control" name="roomNumber"
                                placeholder="Số phòng" />
                            <ErrorMessage name="roomNumber" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Loại phòng</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.roomType" class="form-select" as="select" name="roomType" id="">
                                <option v-for="roomType in optionRoomType" :value="roomType.value">
                                    {{ roomType.title }}
                                </option>
                            </Field>
                            <ErrorMessage name="roomType" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Giá mỗi đêm</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.pricePerNight" type="number" class="form-control" min="1"
                                name="pricePerNight" />
                            <ErrorMessage name="pricePerNight" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Photos</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <input ref="file" class="form-control" type="file" accept="image/*" multiple />

                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Description</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <ckeditor :editor="editor" v-model="roomEdit.description"></ckeditor>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Bed</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.bed" class="form-select" as="select" name="bed" id="">
                                <option v-for="bed in optionBed" :value="bed.value">
                                    {{ bed.title }}
                                </option>
                            </Field>
                            <ErrorMessage name="bed" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Rating</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.rating" class="form-select" as="select" name="rating" id="">
                                <option v-for="rating in optionRating" :value="rating.value">
                                    {{ rating.title }}
                                </option>
                            </Field>
                            <ErrorMessage name="rating" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Star</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.star" class="form-select" as="select" name="star" id="">
                                <option v-for="star in optionStar" :value="star.value">
                                    {{ star.title }}
                                </option>
                            </Field>
                            <ErrorMessage name="star" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>Trạng thái</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.status" class="form-select" as="select" name="status" id="">
                                <option v-for="status in optionStatus" :value="status.value">
                                    {{ status.title }}
                                </option>
                            </Field>
                            <ErrorMessage name="status" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-2">*</span>
                                <span>locked</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-6">
                            <Field v-model="roomEdit.locked" class="form-select" as="select" name="locked" id="">
                                <option v-for="locked in optionLocked" :value="locked.value">
                                    {{ locked.title }}
                                </option>
                            </Field>
                            <ErrorMessage name="star" class="error-feedback" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="d-grid col-12 d-sm-flex justify-content-sm-center mx-auto">
                    <button type="submit" class="btn btn-primary mb-3 mb-sm-0 me-0 me-sm-2">Save</button>
                    <router-link class="btn btn-outline border border-4" :to="{ name: 'admin-room' }">
                        Hủy
                    </router-link>
                </div>
            </div>
        </a-card>
    </Form>
</template>

<script>
import roomService from "../../services/room.service";
import { useMenu } from '../../store/use-menu'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        ckeditor: CKEditor.component,
    },
    props: {
        id: { type: String, required: true }
    },
    data() {
        const menu = useMenu();
        const roomSchema = yup.object().shape({
            roomNumber: yup
                .string()
                .min(1, "Ít nhất 1 ký tự")
                .max(10, "Nhiều nhất 10 ký tự.")
                .required("Is required."),
            roomType: yup
                .string()
                .required("Is required."),
            pricePerNight: yup
                .number()
                .required("Is required."),
            bed: yup
                .string()
                .required("Is required."),
            star: yup
                .number()
                .required("Is required."),
            rating: yup
                .number()
                .required("Is required."),
            status: yup
                .number()
                .required("Is required."),
            locked: yup
                .number()
                .required("Is required."),
        });
        return {
            menu,
            roomSchema,
            optionStar: [
                { value: 5, title: '5 Sao' },
                { value: 4, title: '4 Sao' },
                { value: 3, title: '3 Sao' },
                { value: 2, title: '2 Sao' },
                { value: 1, title: '1 Sao' },
            ],
            optionRoomType: [
                { value: "Phòng Deluxe(hướng thành phố)", title: 'Phòng Deluxe(hướng thành phố)' },
                { value: "Phòng Deluxe(hướng sông)", title: 'Phòng Deluxe(hướng sông)' },
                { value: "Phòng Executive (hướng thành phố)", title: 'Phòng Executive (hướng thành phố)' },
                { value: "Phòng Executive (hướng sông)", title: 'Phòng Executive (hướng sông)' },
                { value: "Phòng Deluxe Suite(hướng thành phố)", title: 'Phòng Deluxe Suite(hướng thành phố)' },
                { value: "Phòng Deluxe Suite(hướng sông)", title: 'Phòng Deluxe Suite(hướng sông)' },
                { value: "Phòng President Suite", title: 'Phòng President Suite' },
            ],
            optionBed: [
                { value: "Twin", title: 'Twin' },
                { value: "king", title: 'King' },

            ],
            optionRating: [
                { value: 1, title: 1 },
                { value: 2, title: 2 },
                { value: 3, title: 3 },
                { value: 4, title: 4 },
                { value: 5, title: 5 },
                { value: 6, title: 6 },
                { value: 7, title: 7 },
                { value: 8, title: 8 },
                { value: 9, title: 9 },
                { value: 10, title: 10 },
            ],
            optionStatus: [
                { value: 1, title: "Sẵn sàng phục vụ" },
                { value: 2, title: "Đang lau dọn" },
                { value: 3, title: "Chưa checkin" },
                { value: 4, title: "Đã checkin" },
                { value: 5, title: "Đang trả phòng" },
            ],
            optionLocked: [
                { value: 1, title: "Đã khóa" },
                { value: 2, title: "Đang sử dụng" },
            ],
            roomEdit: {},
            editor: ClassicEditor,
        }
    },
    async mounted() {
        this.menu.onSelectedKeys(["admin-room"]);
        this.refresh()
    },
    watch: {

    },
    methods: {
        async refresh() {
            try {
                const result = await roomService.getOne(this.id);
                this.roomEdit = result.room
            }
            catch (err) {
                console.error(err);
            }
        }
        ,
        async submitForm(values, { resetForm }) {
            delete values.photos
            const formData = new FormData();
            if (this.$refs.file.files.length !== 0) {
                for (let i = 0; i < this.$refs.file.files.length; i++) {
                    let file = this.$refs.file.files[i];
                    formData.append('files', file);
                }
                console.log(1);
            }

            formData.append("data", JSON.stringify({ ...values, description: this.roomEdit.description }))
            try {
                const result = await roomService.updateOne(this.id, formData);
                await this.alert(result.status, result.message);
            }
            catch (err) {
                // await this.alert(err.response.data.status, err.response.data.message);
                console.error(err);
            }
            resetForm();
            this.refresh();
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
.card-image{
    font-size: 18px;
    box-shadow: -6px -6px teal;
    padding: 40px;
}
.card-form {
    font-size: 18px;
    box-shadow: 6px 6px teal;
}
.error-feedback {
    color: red;
}
</style>