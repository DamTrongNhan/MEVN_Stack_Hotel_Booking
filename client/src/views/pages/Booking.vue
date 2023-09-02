<template>
  <main class="main">
    <div class="slogan mb-5 d-flex justify-content-center align-items-center flex-column">
      <h1 class="text-success mb-3">
        <i>
          Come as a guest, leave as a friend
        </i>
      </h1>
      <h2 class="text-success">
        <i>
          Don't just dream about a vacation. Just do it!
        </i>
      </h2>
    </div>
    <div class="input-container">
      <div class="roomType-input d-flex justify-content-center align-items-center px-3">
        <v-select v-model="roomType" :options="options" label="title" class="w-100"
          placeholder="Chọn loại phòng"></v-select>
      </div>

      <div class="date-input d-flex justify-content-center align-items-center px-3 gap-2">
        <VueDatePicker v-model="checkinDate" :format="formatCheckin" :enable-time-picker="false" class="" />
        <VueDatePicker v-model="checkoutDate" :format="formatCheckout" :enable-time-picker="false" class="" />
      </div>
      <div class="guest-input d-flex justify-content-center align-items-center"
        @click="isSelectionOpen = !isSelectionOpen">
        <div class="d-flex justify-content-center align-items-center gap-3">
          <span class=" btn btn-outline-success">
            {{ adultNum }} Adults
          </span>

          <span class=" btn btn-outline-success">
            {{ childrenNum }} Children
          </span>
        </div>
        <div v-show="isSelectionOpen" class="guest-input-body w-100">
          <div class="d-flex align-items-center w-100 mb-3">
            <span class="w-50">
              Adult
            </span>
            <div class="d-flex align-items-center w-50">
              <button @click="adultNum === 1 ? null : adultNum--" class="guest-btn btn btn-outline-success">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="count-span ms-3 me-3">
                {{ adultNum }}
              </span>
              <button @click="adultNum === 10 ? null : adultNum++" class="guest-btn btn btn-outline-success">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="d-flex align-items-center w-100">
            <span class="w-50">
              Children
            </span>
            <div class="d-flex align-items-center w-50">
              <button @click="childrenNum === 0 ? null : childrenNum--" class="guest-btn btn btn-outline-success">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="count-span ms-3 me-3">
                {{ childrenNum }}
              </span>
              <button @click="childrenNum === 10 ? null : childrenNum++" class="guest-btn btn btn-outline-success">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Thông tin guestData gửi lên parent(MainView) và HotelResults sẽ nhận guestData -->
      <router-link :to="{ name: 'result' }">
        <button @click="setGuestData" class="search-button">
          Search
        </button>
      </router-link>
    </div>

    <TheSlider />

    <h2 class="my-4">Gói Nghỉ Dưỡng &Ưu Đãi Phòng</h2>
    <div class="promotion-ideas">
      <div class="item">
        <div class="promotion1">
          <p class="pro-name">
            Family Weekend Staycation
          </p>
        </div>
      </div>
      <div class="item">
        <div class="promotion2">
          <p class="pro-name">
            Luxurious Package
          </p>
        </div>
      </div>
      <div class="item">
        <div class="promotion3">
          <p class="pro-name">
            Delight Seafood
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
  
<script>
import TheSlider from "../../components/pages/TheSlider.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import vSelect from "vue-select";
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { TheSlider, VueDatePicker, vSelect },
  data() {
    return {
      isSelectionOpen: false,
      roomType: { title: "Deluxe(hướng thành phố)", value: "Phòng Deluxe(hướng thành phố)" },
      checkinDate: null,
      checkoutDate: null,
      adultNum: 1,
      childrenNum: 0,
      options: [
        { title: "Deluxe(hướng thành phố)", value: "Phòng Deluxe(hướng thành phố)" },
        { title: "Deluxe(hướng sông)", value: "Phòng Deluxe(hướng sông)" },
        { title: "Executive (hướng thành phố)", value: "Phòng Executive (hướng thành phố)" },
        { title: "Executive (hướng sông)", value: "Phòng Executive (hướng sông)" },
        { title: "Deluxe Suite(hướng thành phố)", value: "Phòng Deluxe Suite(hướng thành phố)" },
        { title: "Deluxe Suite(hướng sông)", value: "Phòng Deluxe Suite(hướng sông)" },
        { title: "President Suite", value: "Phòng President Suite" }
      ]
    };
  },
  methods: {
    formatCheckin(dateData) {
      let date = new Date(dateData);
      date = `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      this.checkinDate = date;
      return date;
    },
    formatCheckout(dateData) {
      let date = new Date(dateData);
      date = `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      this.checkoutDate = date;
      return date;
    },
    // Khi guest nhập đầy đủ thông tin và nhấn search, emits sẽ gửi sự kiện setGuestData và data lên parent(mainview)
    setGuestData() {
      this.$emit("setGuestData", {
        roomType: this.roomType.value,
        adult: this.adultNum,
        children: this.childrenNum,
        days: this.calculateDays,
        checkinDate: this.checkinDate,
        checkoutDate: this.checkoutDate,
      });
    },
    // Khởi tạo today và đặt nó làm giá trị ban đầu cho checkinDate
    today() {
      let today = new Date();
      today = `${today.getFullYear().toString().padStart(4, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      this.checkinDate = today;
    },
    // Khởi tạo tomorrow và đặt nó làm giá trị ban đầu cho checkoutDate

    tomorrow() {
      let today = Date.now();
      let tomorrow = new Date(today + 86400000);
      tomorrow = `${tomorrow.getFullYear().toString().padStart(4, '0')}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')}`;
      this.checkoutDate = tomorrow;
    },
  },
  computed: {
    // Tính toán ngày ở bằng checkinDate & checkoutDate
    calculateDays() {
      let checkin = new Date(this.checkinDate);
      let checkout = new Date(this.checkoutDate);
      if (checkin >= checkout) {
        this.today();
        this.tomorrow();
        return 1;
      } else {
        let difference = checkout.getTime() - checkin.getTime();
        return difference / (1000 * 3600 * 24);
      }
    },
  },
  mounted() {
    // Khởi tạo this.checkinDate and this.checkoutDate khi component được mounted
    this.today();
    this.tomorrow();
  },
};
</script>
<style>
@import "vue-select/dist/vue-select.css";
</style>
<style scoped>
.main {
  padding: 40px 60px 30px 60px;
}

.slogan {
  padding: 20px;
  /* border-top-right-radius: 40px; */
  border-top-left-radius: 80px;
  /* border-bottom-left-radius: 40px; */
  border-bottom-right-radius: 80px;
  border: 4px solid green;
}

.input-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 50px;
  border: 4px solid green;
  border-radius: 5px;
}

.roomType-input {
  outline: none;
  border: none;
}

.roomType-input {
  grid-column-start: 1;
  grid-column-end: 3;
  border-right: 4px solid green;
  color: green;
}

.date-input {
  font-size: 16px;
  grid-column-start: 3;
  grid-column-end: 5;
  border-right: 4px solid green;
}

.guest-input {
  height: 60px;
  position: relative;
  grid-column-start: 5;
  grid-column-end: 7;
  cursor: pointer;
  border-right: 4px solid green;
}

.guest-input-body {
  z-index: 10;
  padding: 20px;
  background-color: white;
  position: absolute;
  top: 60px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.guest-btn {
  width: 40px;
  height: 40px;
  font-weight: 600;
}

.search-button {
  font-size: 20px;
  font-weight: 500;
  border: none;
  outline: none;
  color: green;
  background-color: white;
  height: 100%;
  width: 100%;
  transition: all linear 0.2s;
  grid-column-start: 7;
  grid-column-end: 8;
}

.search-button:hover {
  color: white;
  background-color: #0c713d;
}

.count-span {
  width: 20%;
  text-align: center;
}


.promotion-ideas {
  width: 100%;
  min-height: 250px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
}

.item {
  overflow: hidden;
}

.promotion1 {
  background: url(/promotion/famlily.jpg) no-repeat center center;
  background-size: cover;
  transition: all linear 0.2s;
  width: 100%;
  height: 100%;
}

.promotion2 {
  background: url(/promotion/luxuriousPackage.jpg) no-repeat center center;
  background-size: cover;
  transition: all linear 0.2s;
  width: 100%;
  height: 100%;
}

.promotion3 {
  background: url(/promotion/seafood.jpg) no-repeat center center;
  background-size: cover;
  transition: all linear 0.2s;
  width: 100%;
  height: 100%;
}

.promotion1:hover {
  transform: scale(1.2);
}

.promotion2:hover {
  transform: scale(1.2);
}

.promotion3:hover {
  transform: scale(1.2);
}

.pro-name {
  background: linear-gradient(0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(38, 38, 38, 1) 100%);
  padding: 10px 20px;
  font-size: 30px;
  font-weight: 600;
  color: rgb(241, 241, 241);
  text-shadow: 1px 1px #f2ecec;
}


@media only screen and (max-width: 1000px) {
  .input-container {
    grid-template-columns: 1fr;
  }

  .roomType-input,
  .date-input,
  .guest-input,
  .search-button {
    grid-column-start: 1;
    grid-column-end: 2;
    border-right: none;
    border-bottom: 2px solid green;
    height: 60px;
  }
}

@media only screen and (max-width: 800px) {
  .promotion-ideas {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .promotion1,
  .promotion2,
  .promotion3 {
    height: 250px;
  }
}
</style>
  