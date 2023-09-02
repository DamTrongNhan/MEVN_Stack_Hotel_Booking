<template>
  <main class="main f-flex justify-content-center align-items-center flex-column  ">
    <!-- Khởi tạo form cho mỗi guest dựa trên number của guests -->
    <ReservationForm v-for="(item, index) in totalGuests" :key="index" :num="item" :id="index" :totalGuests="totalGuests"
      :allGuestInfo="allGuestInfo" @formCompleted="nextForm" @goPayment="sendAllGuestInfo" ref="formArray" />
  </main>
</template>

<script>
import ReservationForm from "../../components/pages/ReservationForm.vue";
export default {
  data() {
    return {
      allGuestInfo: [],
      count: 0,
    };
  },
  components: {
    ReservationForm,
  },
  props: {
    guestData: Object,
  },
  methods: {
    //  Nếu form completed và validate không có lỗi, lưu guest data và focus vào form kế tiếp
    nextForm(personalInfo) {
      if (
        this.allGuestInfo.find(
          (item) => item.formId === personalInfo.formId)
      ) {
        let sameFormIndex = this.allGuestInfo.findIndex(
          (item) => item.formId === personalInfo.formId);
        this.allGuestInfo.splice(sameFormIndex, 1);
      }
      this.allGuestInfo.push(personalInfo);
      if (personalInfo.formId + 1 !== this.totalGuests) {
        this.count = personalInfo.formId + 1;
        this.$refs.formArray[this.count].focus();
      }
    },
    // Gửi thông tin của guests lên parent(mainview) và chuyển nó đến payment 
    async sendAllGuestInfo() {
      this.$emit("sendAllGuestInfo", this.allGuestInfo);
    },
  },

  computed: {
    // Tính toán tổng số khách 
    totalGuests() {
      return this.guestData.adult + this.guestData.children;
    },
  },
  mounted() {
    this.$refs.formArray[0].focus();
  }
};
</script>

<style scoped>
.main {
  padding: 50px 50px 50px 50px;
}
</style>
