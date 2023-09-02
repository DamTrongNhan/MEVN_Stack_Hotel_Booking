<template>
    <a-carousel arrows dots-class="slick-dots slick-thumb">
      <template #customPaging="props">
        <a>
          <img :src="getImgUrl(props.i)" />
        </a>
      </template>
      <div v-for="item in 5" :key="item">
        <img :src="getImgUrl(item - 1)" />
      </div>
    </a-carousel>
</template>
<script>

const baseUrl = '/imgPage/carousel/';
export default {
  data() {
    return {}
  },
  methods: {
    getImgUrl(i) {
      return `${baseUrl}banner${i + 1}.jpg`
    }
  }
}
</script>
<style scoped>
@import "../../assets/css/ant.css";
</style>