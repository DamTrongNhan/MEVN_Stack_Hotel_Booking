<template>
    <a-card title="Tài khoản" style="width: 100%">
        <div class="row">
            <div class="col-12 d-flex align-items-center gap-3 justify-content-end mb-3">
                <a-button type="primary">
                    <router-link :to="{ name: 'admin-users-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
                <a-button type="default">
                    <router-link :to="{ name: 'admin-users-adminList' }">
                        <i class="fa-solid fa-user-tie"></i>
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="user" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <!-- <template v-if="column.key === 'index'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template> -->
                        <template v-if="column.key === 'status'">
                            <span v-if="record.open === true" class="text-primary">
                                Open
                            </span>
                            <span v-else class="text-danger">
                                Block
                            </span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <div class="d-flex justify-content-center flex-wrap flex-xl-nowrap gap-2">
                                <router-link class="btn btn-outline-primary"
                                    :to="{ name: 'admin-users-detail', params: { id: record._id } }">Detail</router-link>
                                <router-link class="btn btn-outline-warning"
                                    :to="{ name: 'admin-users-edit', params: { id: record._id } }">Edit</router-link>
                                <button @click="toggle(record._id, !record.open)"
                                    :class="record.open ? 'btn btn-outline-danger' : 'btn btn-outline-success'">
                                    {{ record.open ? "Block" : "Open" }}
                                </button>
                                <button class="btn btn-danger" @click="deleteOne(record._id)">Delete</button>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-card>
</template>

<script>
import userService from "../../services/user.service";
import { useMenu } from '../../store/use-menu';
export default {
    data() {
        const columns = [
            // {
            //     title: "#",
            //     key: "index",
            // },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: "status",
                key: "status",
                responsive: ['sm'],
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Công cụ",
                key: "action",
                fixed: "right"
            }
        ];
        const menu = useMenu()
        return { menu, user: [], columns }
    },
    mounted() {
        this.menu.onSelectedKeys(["admin-users"]);
        this.getUsers();
    },
    methods: {
        async getUsers() {
            try {
                const result = await userService.getAllUser();
                if (result.users)
                    this.user = result.users;
            } catch (error) {
                console.error(error);
            }
        },
        async toggle(id, open) {
            try {
                const result = await userService.toggle(id, { open })
                if (result) {
                    this.alert(result.status, result.message)
                    this.getUsers()
                }
            }
            catch (err) {
                console.error(err);
            }
        },
        async deleteOne(id) {
            await this.$swal.fire({
                title: 'Bạn có chắc muốn xóa vĩnh viễn tài khoản này',
                text: "Bạn không thể phục hồi khi xóa",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa!'
            })
                .then(async (confirm) => {
                    if (confirm.isConfirmed) {
                        try {
                            await userService.deleteOne(id);
                            await this.$swal.fire(
                                'Đã xóa',
                                'User đã bị xóa',
                                'success'
                            );
                            this.getUsers();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })

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

<style  scoped></style>