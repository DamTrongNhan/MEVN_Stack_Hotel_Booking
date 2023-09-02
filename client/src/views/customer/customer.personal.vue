<template>
    <a-card title="Thông tin tài khoản" style="width: 100%">
        <div class="d-flex justify-content-center gap-3">
            <div class="rounded card-user w-50">
                <div class="p-4">
                    <p class="m-0 mb-1">
                        <b>
                            Tên:
                        </b>
                        {{ user.name ? user.name : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Phone:
                        </b>
                        {{ user.phone ? user.phone : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Email:
                        </b>
                        {{ user.email }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            CIC:
                        </b>
                        {{ user.CIC ? user.CIC : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            GoogleID:
                        </b>
                        {{ user.GoogleId ? user.GoogleId : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Country:
                        </b>
                        {{ user.country ? user.country : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            City:
                        </b>
                        {{ user.city ? user.city : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Address:
                        </b>
                        {{ user.address ? user.address : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Role:
                        </b>
                        {{ user.role }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Status:
                        </b>
                        {{ user.open ? "Đang mở" : "Đang bị khóa" }}
                    </p>
                </div>
            </div>
            <div class="rounded card-image d-flex justify-content-center align-items-center">
                <a-image v-if="!user.avatar" :width="500" :src="`/imgPage/users-create.jpg`" alt="" />
                <a-image v-else :width="500" :src="`http://localhost:3000/assets/uploads/${user.avatar}`" alt="" />
            </div>
        </div>
    </a-card>
</template>

<script >
import { useMenu } from '../../store/use-menu';
export default {
    data() {
        const menu = useMenu()
        return { menu }
    },
    props: {
        user: Object
    },
    methods: {

    },
    mounted() {
        this.menu.onSelectedKeys(["customer-personal"])
    },

}
</script>

<style scoped>
.card-user {
    background-color: lightgreen;
    font-size: 18px;
    box-shadow: 6px 6px rgb(29, 246, 0);
}

.card-image {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

}
</style>