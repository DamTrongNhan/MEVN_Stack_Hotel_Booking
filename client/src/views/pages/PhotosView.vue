<template>
    <a-card title="Photos" style="width: 100%">
        <div class="row">
            <div class="col-12 d-flex align-items-center gap-3 justify-content-end mb-3">
                <!-- <a-button type="danger" @click="deleteAllPhotos">
                    <i class="fa-sharp fa-solid fa-x"></i>
                </a-button> -->
            </div>
        </div>
        <a-card-grid v-for="(item, index) in photos" :key="index" class="w-25">
            <a-image class="w-100" :src="`http://localhost:3000/assets/uploads/${item.name}`" />
        </a-card-grid>
    </a-card>
</template>

<script >
import photosService from '../../services/photos.service';

export default {
    data() {

        return { photos: [] }
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

    },
    mounted() {
        this.getAll()
    }
}
</script>

<style scoped></style>