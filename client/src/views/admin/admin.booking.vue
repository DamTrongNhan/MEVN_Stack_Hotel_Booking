<template>
    <a-card title="Booking" style="width: 100%">
        <div class="row">
            <div class="col-12 d-flex align-items-center justify-content-end mb-3">
                <a-button type="default">
                    <router-link :to="{ name: 'admin-booking-bin' }">
                        <i class="fa-solid fa-trash"></i>
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="booking" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <!-- <template v-if="column.key === 'index'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template> -->
                        <template v-if="column.key === 'guest'">
                            <span>
                                {{ record.guest.length }}
                            </span>
                        </template>
                        <template v-if="column.key === 'checkinDate'">
                            <span>
                                {{ `${new Date(record.checkinDate).getDate()}-${new Date(record.checkinDate).getMonth() +
                                    1}-${new Date(record.checkinDate).getFullYear()}` }}
                            </span>
                        </template>
                        <template v-if="column.key === 'checkoutDate'">
                            <span>
                                {{ `${new Date(record.checkoutDate).getDate()}-${new Date(record.checkoutDate).getMonth() +
                                    1}-${new Date(record.checkoutDate).getFullYear()}` }}
                            </span>
                        </template>
                        <template v-if="column.key === 'createdAt'">
                            <span>
                                {{
                                    `${new Date(record.createdAt).getDate().toString().padStart(2, '0')}-${(new
                                        Date(record.createdAt).getMonth() +
                                        1).toString().padStart(2, '0')}-${new
                                            Date(record.createdAt).getFullYear().toString().padStart(4,
                                                '0')}-${new Date(record.createdAt).getHours().toString().padStart(2,
                                                    '0')}:${new Date(record.createdAt).getMinutes().toString().padStart(2,
                                                        '0')}:${new Date(record.createdAt).getSeconds().toString().padStart(2, '0')}`
                                }}
                            </span>
                        </template>
                        <template v-if="column.key === 'total_price'">
                            <span>
                                {{ formatCurrency(record.total_price) }}
                            </span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <div class="d-flex justify-content-center flex-wrap gap-2">
                                <router-link class="btn btn-outline-primary"
                                    :to="{ name: 'admin-booking-detail', params: { id: record._id } }">
                                    Detail
                                </router-link>
                                <router-link class="btn btn-outline-warning"
                                    :to="{ name: 'admin-booking-edit', params: { id: record._id } }">
                                    Edit
                                </router-link>
                                <router-link class="btn btn-outline-info"
                                    :to="{ name: 'admin-room-detail', params: { id: record.room_id } }">
                                    Room</router-link>
                                <button @click="deleteBooking(record._id)" class="btn btn-outline-danger">
                                    Delete
                                </button>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-card>
</template>

<script>
import bookingService from "../../services/booking.service";
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
                title: 'Id phòng',
                dataIndex: 'room_id',
                key: 'room_id',
            },
            {
                title: "Số lượng khách",
                key: "guest",
            },
            {
                title: "Checkin",
                key: "checkinDate",
            },
            {
                title: "Checkout",
                key: "checkoutDate",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
            },
            {
                title: "Nights",
                dataIndex: "nights",
                key: "nights",
            },
            {
                title: "Thời gian đặt",
                key: "createdAt",
            },
            {
                title: "Tổng tiền",
                key: "total_price",
            },
            {
                title: "Công cụ",
                key: "action",
                fixed: "right"
            }
        ];
        const menu = useMenu()
        return { menu, booking: [], columns }
    },
    mounted() {
        this.menu.onSelectedKeys(["admin-booking"]);
        this.getAll();
    },
    mixins: [currency],
    methods: {
        async getAll() {
            try {
                const result = await bookingService.getBooking();
                if (result.dataBooking)
                    this.booking = result.dataBooking;
            } catch (error) {
                console.error(error);
            }
        },
        async deleteBooking(id) {
            await this.$swal.fire({
                title: 'Bạn có chắc muốn xóa booking này',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa!'
            })
                .then(async (confirm) => {
                    if (confirm.isConfirmed) {
                        try {
                            await bookingService.softDeleteBooking(id);
                            await this.$swal.fire(
                                'Đã xóa',
                                'Booking đã bị xóa',
                                'success'
                            );
                            this.getAll();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })

        },
    }
}
</script>

<style scoped></style>