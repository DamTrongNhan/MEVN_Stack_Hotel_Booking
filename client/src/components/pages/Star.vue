<template>
  <div class="star-component d-flex align-items-center">
    <!-- Producing stars based on prop (num)-->
    <div v-for="(item, index) of num" :key="index">
      <i class="fa-solid fa-star yellow"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    num: Number,
  },
};
</script>

<style scoped>
.yellow {
  font-size: 16px;
  color: #fcba03;
}
</style>
