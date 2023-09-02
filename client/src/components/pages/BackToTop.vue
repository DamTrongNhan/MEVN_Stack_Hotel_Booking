<template>
  <div class="back-to-top" v-show="showButton" @click="scrollToTop">
    <i class="fa-solid fa-arrow-up"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false,
    };
  },
  methods: {
    checkScroll() {
      // Kiểm tra xem trang đã scroll đến đâu để ẩn hiện nút back to top
      if (window.pageYOffset > 100) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    },
    scrollToTop() {
      // Sự kiện click để scroll lên đầu trang
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    // Thêm sự kiện scroll vào trang
    window.addEventListener("scroll", this.checkScroll);
  },
  destroyed() {
    // Xóa sự kiện scroll khi component bị xóa
    window.removeEventListener("scroll", this.checkScroll);
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgreen;
  color: black;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  cursor: pointer;
  transition: all linear 0.2s;
  opacity: 0.5;
}

.back-to-top:hover {
  opacity: 1;
}
</style>