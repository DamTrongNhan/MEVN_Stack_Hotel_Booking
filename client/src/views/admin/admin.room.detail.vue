<template>
    <a-card title="Thông tin phòng" style="width: 100%">
        <div class="d-flex justify-content-center align-items-start gap-3">
            <div class="rounded card-room w-50">
                <div class="p-4">
                    <p class="m-0 mb-1">
                        <b>
                            Số phòng:
                        </b>
                        {{ room.roomNumber }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Loại phòng:
                        </b>
                        {{ room.roomType }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Giá mỗi đêm:
                        </b>
                        {{ room.pricePerNight }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Description:
                        </b>
                    <div v-html="room.description"></div>
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Loại giường
                        </b>
                        {{ room.bed }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Star:
                        </b>
                        {{ room.star }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Dịch vụ:
                        </b>
                        {{ room.amenities ? room.amenities : "Chưa cập nhật" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Rating:
                        </b>
                        {{ room.rating }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Trạng thái:
                        </b>
                        <span v-if="room.status === 1">
                            Sẵn sàng phục vụ
                        </span>
                        <span v-else-if="room.status === 2">
                            Đang lau dọn
                        </span>
                        <span v-else-if="room.status === 3">
                            Chưa checkin
                        </span>
                        <span v-else-if="room.status === 4">
                            Đã checkin
                        </span>
                        <span v-else>
                            Đang trả phòng
                        </span>
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Tình trạng:
                        </b>
                        {{ room.locked === 2 ? "Phòng đang được sử dụng " : "Đã khóa" }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Reviews:
                        </b>
                        {{ room.reviews ? room.reviews : "Chưa cập nhật" }}
                    </p>
                </div>
            </div>
            <div class="rounded card-image w-50">
                <a-image :src="`http://localhost:3000/assets/uploads/${room.photos}`" style="width: 100%;" alt="Hinh" />
            </div>
        </div>
    </a-card>
</template>

<script >
import roomService from '../../services/room.service';
import { useMenu } from '../../store/use-menu';

const menu = useMenu()
export default {
    data() {
        return { room: {}, menu, }
    },
    props: { id: { type: String, required: true } },
    async mounted() {
        this.menu.onSelectedKeys(["admin-room"])
        try {
            const result = await roomService.getOne(this.id)
            this.room = result.room;
            this.room.photos = this.room.photos[0].name
        }
        catch (err) {
            console.error(err);
        }
    }
}
</script>

<style scoped>
.card-room {
    border: 2px solid grey;
    font-size: 16px;
    box-shadow: 7px 7px chartreuse;
}

.card-image {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

}
</style>