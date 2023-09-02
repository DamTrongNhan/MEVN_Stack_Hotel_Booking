<template>
    <a-card title="Room" style="width: 100%">
        <div class="row">
            <div class="col-12 d-flex align-items-center gap-3 justify-content-end mb-3">
                <a-button type="primary">
                    <router-link :to="{ name: 'admin-room-add' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
                <a-button type="danger" @click="deleteAll">
                    <i class="fa-sharp fa-solid fa-x"></i>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="room" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <!-- <template v-if="column.key === 'index'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template> -->

                        <template v-if="column.key === 'pricePerNight'">
                            <span>
                                {{ formatCurrency(record.pricePerNight) }}
                            </span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <div class="d-flex justify-content-center flex-wrap flex-xl-nowrap gap-2">
                                <router-link class="btn btn-outline-primary"
                                    :to="{ name: 'admin-room-detail', params: { id: record._id } }">Detail</router-link>
                                <router-link class="btn btn-outline-warning"
                                    :to="{ name: 'admin-room-edit', params: { id: record._id } }">Edit</router-link>
                                <button @click="deleteRoom(record._id)" class="btn btn-outline-danger">Delete</button>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-card>
</template>

<script>
import roomService from "../../services/room.service";
import currency from "../../mixins/Filters"
import { useMenu } from '../../store/use-menu';
export default {
    data() {
        const columns = [
            // {
            //     title: "#",
            //     key: "index",
            // },
            {
                title: 'Số phòng',
                dataIndex: 'roomNumber',
                key: 'roomNumber',
            },
            {
                title: "Loại phòng",
                dataIndex: 'roomType',
                key: "roomType",
                responsive: ['sm'],
            },
            {
                title: "Giá mỗi đêm",
                key: "pricePerNight",
            },
            {
                title: "Loại giường",
                dataIndex: "bed",
                key: "bed",
            },
            {
                title: "Công cụ",
                key: "action",
                fixed: "right"
            }
        ];
        const menu = useMenu()
        return { menu, room: [], columns }
    },
    mounted() {
        this.menu.onSelectedKeys(["admin-room"]);
        this.getAll();
    },
    mixins: [currency],
    methods: {
        async getAll() {
            try {
                const result = await roomService.getAll();
                if (result.dataRoom)
                    this.room = result.dataRoom;
            } catch (error) {
                console.error(error);
            }
        },
        async deleteRoom(id) {
            await this.$swal.fire({
                title: 'Bạn có chắc muốn xóa room này',
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
                            await roomService.deleteOne(id);
                            await this.$swal.fire(
                                'Đã xóa',
                                'Room đã bị xóa',
                                'success'
                            );
                            this.getAll();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })

        },
        async deleteAll() {
            await this.$swal.fire({
                title: 'Bạn có chắc muốn xóa tất cả room',
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
                            await roomService.deleteAll();
                            await this.$swal.fire(
                                'Đã xóa',
                                'Tất cả room đã bị xóa',
                                'success'
                            );
                            this.getAll();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })
        }
    }
}
</script>

<style scoped></style>