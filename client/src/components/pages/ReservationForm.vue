<template>
    <div class="d-flex justify-content-center mb-5">
        <form class="p-5 w-75">
            <fieldset>
                <legend class="btn btn-lg btn-outline-success">Guest - {{ num }}</legend>
                <div class="d-flex justify-content-between flex-row flex-wrap">
                    <div class="item mt-3">
                        <label for="name">
                            Name
                            <span>
                                *
                            </span>
                        </label>
                        <input class="form-control" v-model="name" id="name" type="text" name="name" placeholder="TrongNhan"
                            ref="input" />
                        <div class="error" v-if="errors.name">
                            {{ errors.name }}
                        </div>

                    </div>
                    <!-- Age input Validate -->
                    <div class="item mt-3">
                        <label for="age">
                            Age
                            <span>
                                *
                            </span>
                        </label>
                        <input class="form-control" id="age" type="number" min="1" name="age" v-model="age"
                            placeholder="Nhập tuổi của bạn" />
                        <div class="error" v-if="errors.age">
                            {{ errors.age }}
                        </div>
                    </div>
                    <!-- Sex input Validate -->
                    <div class="item mt-3">
                        <label class="" for="sex">
                            Sex
                            <span>
                                *
                            </span>
                        </label>
                        <select class="form-select mt-2" v-model="sex" name="sex" id="sex">
                            <option value="" disabled selected>Select Your Sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <div class="error" v-if="errors.sex">
                            {{ errors.sex }}
                        </div>
                    </div>
                    <!-- T.C. Identity No. input area and validations -->
                    <div class="item mt-3">
                        <label for="CCCD">
                            Identity No.
                            <span>
                                *
                            </span>
                        </label>
                        <input class="form-control" v-model="CCCD" id="CCCD" type="text" name="CCCD"
                            placeholder="Identity No." />
                        <div class="error" v-if="errors.CCCD">
                            {{ errors.CCCD }}
                        </div>
                    </div>
                    <!-- E-mail input Validate -->
                    <div class="item mt-3">
                        <label for="email">
                            Email Address
                            <span>
                                *
                            </span>
                        </label>
                        <input class="form-control" v-model="email" id="email" type="email" name="email"
                            placeholder="nhanb1910113@student.ctu.edu.vn" />
                        <div class="error" v-if="errors.email">
                            {{ errors.email }}
                        </div>

                    </div>
                    <!-- Phone input Validate -->
                    <div class="item mt-3">
                        <label for="phone">
                            Phone
                            <span>
                                *
                            </span>
                        </label>
                        <input class="form-control" v-model="phone" id="phone" type="tel" name="phone"
                            placeholder="0829388509" />
                        <div class="error" v-if="errors.phone">
                            {{ errors.phone }}
                        </div>
                    </div>
                </div>
                <!-- Last name input Validate -->
                <div class="mt-3 mb-4">
                    <label for="comment">
                        Comment
                    </label>
                    <input class="form-control" v-model="comment" type="text" name="comment" placeholder="" />
                    <div class="error" v-if="errors.comment">
                        {{ errors.comment }}
                    </div>
                </div>
            </fieldset>

            <div class="d-flex justify-content-center">
                <!-- Hiện Next Guest button để chuyển sang form kế nếu có -->
                <button class="nav-btn" v-if="id !== totalGuests - 1" @click.prevent="checkCompletion()">
                    Next Guest
                </button>
                <!-- Hiện Go to payment button cho form cuối để chuyển sang payment component -->
                <button class="nav-btn" v-else @click.prevent="goPayment()">
                    Go to Payment
                </button>
            </div>

        </form>
    </div>
</template>
  
<script>
import * as yup from 'yup';

export default {
    data() {
        return {
            name: "Nhan",
            comment: "Nhan",
            age: "20",
            email: "nhanb1910113@student.ctu.edu.vn",
            sex: "Male",
            CCCD: "1111",
            phone: "0829388509",
            errors: {},
        };
    },
    props: {
        num: Number,
        id: Number,
        totalGuests: Number,
        allGuestInfo: Array,
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        async validate() {
            const schema = yup.object().shape({
                name: yup
                    .string()
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự.")
                    .required("Tên phải có giá trị"),
                age: yup
                    .string()
                    .required("Tuổi phải có giá trị"),
                email: yup
                    .string()
                    .email("E-mail không đúng.")
                    .max(50, "E-mail tối đa 50 ký tự.")
                    .required("Email phải có giá trị."),
                sex: yup
                    .string()
                    .required("Giới tính phải có giá trị"),
                CCCD: yup
                    .string()
                    .required("identity phải có giá trị"),
                phone: yup
                    .string()
                    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ.")
                    .required("Phone phải có giá trị."),
                comment: yup
                    .string(),
            });
            try {
                await schema.validate({
                    name: this.name,
                    age: this.age,
                    email: this.email,
                    sex: this.sex,
                    CCCD: this.CCCD,
                    phone: this.phone,
                    comment: this.comment,
                }, {
                    abortEarly: false,
                });
                return true;
            } catch (err) {
                const errors = {};
                err.inner.forEach(e => {
                    errors[e.path] = e.message;
                });
                this.errors = errors;
                return false;
            }
        },
        // Kiểm tra form nếu nó completed và không error thì sẽ emit đến parent(reservation) cùng với data và focus vào form kế tiếp
        async checkCompletion() {
            if (await this.validate()) {
                this.$emit("formCompleted", {
                    formId: this.id,
                    name: this.name,
                    age: this.age,
                    email: this.email,
                    sex: this.sex,
                    CCCD: this.CCCD,
                    phone: this.phone,
                    comment: this.comment,
                });
            }
        },
        // Kiểm tra nếu All Forms complete thì sẽ chuyển đến payment
        async goPayment() {
            if (await this.validate()) {
                 this.$emit("formCompleted", {
                    formId: this.id,
                    name: this.name,
                    age: this.age,
                    email: this.email,
                    sex: this.sex,
                    CCCD: this.CCCD,
                    phone: this.phone,
                    comment: this.comment,
                });
                if (this.allGuestInfo.length === this.totalGuests) {
                    this.$emit("goPayment");
                    this.$router.push({
                        name: "Payment",
                    });
                }
            }
        }
    },
    mounted() {
    }
}
</script>
  
<style scoped>
form {
    box-shadow: 0 0 0 2px rgb(29, 246, 0), 8px 8px 0 0 rgba(29, 246, 0);
}

.nav-btn {
    background-color: #198754;
    color: white;
    transition: all 0.2s linear;
    box-sizing: border-box;
    font-size: 18px;
    padding: 10px;
    box-shadow: 6px 6px rgb(29, 246, 0);
    cursor: pointer;
    border: none;
}

.nav-btn:active {
    box-shadow: none;
    transform: translate(4px, 4px);
}

input {
    width: calc(100% - 10px);
    margin-top: 10px;
}

select {
    padding: 6px 10px;
}

.item {
    width: 48%;
}

.error,
span {
    color: red;
}
</style>
  