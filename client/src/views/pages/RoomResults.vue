<template>
  <div class="main">
    <!-- Hiện thông tin guest đã chọn ở booking -->
    <div class="search-container">
      <div class="w-100">
        <label>Kind of room</label>
        <div class="d-flex align-items-center my-3">
          <div class="result">{{ guestData.roomType }}</div>
        </div>
      </div>
      <div class="w-100">
        <label> Check-in date </label>
        <div class="d-flex align-items-center my-3">
          <i class="fa-regular fa-calendar-days fa-lg ms-2 me-3"></i>
          <div class="result">
            {{ guestData.checkinDate }}
          </div>
        </div>
      </div>
      <div class="w-100">
        <label> Check-out date</label>
        <div class="d-flex align-items-center my-3">
          <i class="fa-solid fa-calendar-days fa-lg ms-2 me-3"></i>
          <div class="result">
            {{ guestData.checkoutDate }}
          </div>
        </div>
      </div>
      <div class="w-100">
        <label>Night stay</label>
        <div class="d-flex align-items-center my-3">
          <i class="fa-solid fa-moon fa-lg ms-2 me-3"></i>
          <div class="result">
            {{ guestData.days }} nights
          </div>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-start align-items-start gap-5">
        <div class="w-50">
          <label> Adults</label>
          <div class="d-flex align-items-center my-3">
            <i class="fa-solid fa-user fa-lg ms-2 me-3"></i>
            <div class="result">
              {{ guestData.adult }}
            </div>
          </div>
        </div>
        <div class="w-50">
          <label> Children</label>
          <div class="d-flex align-items-center my-3">
            <i class="fa-solid fa-child fa-xl ms-2 me-3"></i>
            <div class="result">
              {{ guestData.children }}
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center gap-3 align-items-center nav-btn">
        <router-link :to="{ name: 'booking' }" class="text-decoration-none text-light">
          Booking
        </router-link>
        <i class="fa-solid fa-magnifying-glass fa-lg"></i>
      </div>

    </div>

    <div class="RoomCard-container" v-if="roomData">
      <h3 class="mb-3">
        {{ guestData.roomType }} hiện đang sẵn có {{ selectedRoomType.length }}
      </h3>
      <RoomCard @sendSelectedRoomData="getSelectedRoomData" v-for="room in selectedRoomType" :key="room._id" :room="room"
        :guestData="guestData" />
    </div>

  </div>
</template>

<script>
import RoomCard from "../../components/pages/RoomCard.vue";
export default {
  props: {
    roomData: {
      type: Object,
      reuired: false
    },
    guestData: {
      type: Object,
      reuired: false
    },
  },
  components: {
    RoomCard,
  },
  methods: {
    getSelectedRoomData(data) {
      this.$emit("sendSelectedRoomData", data)
    }
  },
  computed: {
    // Lọc ra kết quả dựa trên khách thông tin khách chọn
    selectedRoomType() {
      return this.roomData.filter(
        (item) => item.roomType === this.guestData.roomType
      );
    },
  },


};
</script>

<style scoped>
h2 {
  font-size: 20px;
  font-weight: 600;
}

label {
  font-size: 14px;
  font-weight: 600;
}

.main {
  display: grid;
  column-gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px 70px 50px 70px;

}

.search-container {
  width: 270px;
  padding: 20px 20px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
  grid-column-start: 1;
  grid-column-end: 2;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.RoomCard-container {
  grid-column-start: 2;
  grid-column-end: 5;
}

.result {
  font-size: 15px;
  font-weight: 400;
}

.nav-btn {
  background-color: #198754;
  color: white;
  transition: all 0.2s linear;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px;
  box-shadow: 6px 6px rgb(29, 246, 0);
  cursor: pointer;
  width: 100%;
}

.nav-btn:active {
  box-shadow: none;
  transform: translate(4px, 4px);
}

@media only screen and (max-width: 1200px) {
  .main {
    grid-template-columns: 1fr;
  }

  .search-container {
    display: none;
  }

  .RoomCard-container {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>
