<template>
    <a-card title="Photos" style="width: 100%">
        <div class="row">
            <div class="col-12 d-flex align-items-center gap-3 justify-content-end mb-3">
                <a-button type="danger" @click="deleteAllPhotos">
                    <i class="fa-sharp fa-solid fa-x"></i>
                </a-button>
            </div>
        </div>
        <a-card-grid v-for="(item, index) in photos" :key="index" class="w-25">
            <a-image class="w-100" :src="`http://localhost:3000/assets/uploads/${item.name}`" />
        </a-card-grid>
    </a-card>
</template>


<script >
import photosService from '../../services/photos.service';
import { useMenu } from '../../store/use-menu';

export default {
    data() {
        const menu = useMenu()

        return { menu, photos: [] }
    },
    methods: {
        async getAll() {
            try {
                const result = await photosService.getAllPhotos();
                if (result.dataPhotos)
                    this.photos = result.dataPhotos;
            } catch (error) {
                console.error(error);
            }
        },
        async deleteAllPhotos() {
            await this.$swal.fire({
                title: 'Bạn có chắc muốn xóa tất cả Photos',
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
                            await photosService.deleteAllPhotos();
                            await this.$swal.fire(
                                'Đã xóa',
                                'Tất cả photos đã bị xóa',
                                'success'
                            );
                            this.getAll();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })

        },
    },
    mounted() {
        this.menu.onSelectedKeys(["admin-photos"])
        this.getAll()
    }
}
</script>

<style scoped></style>