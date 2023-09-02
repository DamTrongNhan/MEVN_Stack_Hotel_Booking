<template>
  <div class="room-card d-flex p-3 mb-3">
    <img :src="`http://localhost:3000/assets/uploads/${room.photos[0].name}`" class="card-img rounded me-3" alt="" />
    <div class="d-flex flex-column justify-content-center gap-3">
      <h5 class="card-title">
        Phòng số {{ room.roomNumber }}
      </h5>
      <p class="card-text">
        {{ room.roomType }}
      </p>
      <p class="card-text">
        <Star :num="room.star" />
      </p>
      <p class="card-text">
        <i class="fa-solid fa-bed me-2"></i>
        {{ room.bed }}
      </p>
    </div>

    <div class="ms-auto d-flex flex-column justify-content-between">
      <div class="d-flex justify-content-end align-items-center">
        <div class="d-flex flex-column">
          <span class="me-2">
            {{ setRatingText }}
          </span>
          <small>
            501 Reviews
          </small>
        </div>
        <div class="rating d-flex justify-content-center align-items-center ms-1">
          {{ room.rating }}
        </div>
      </div>
      <div class="d-flex flex-column align-items-end mt-2">
        <button class="btn btn-outline-success">
          {{ guestData.days }} Night -
          {{ guestData.adult }} Adult -
          {{ guestData.children }} Children
        </button>
        <p class="m-0 mt-2 h4">
          {{ formatCurrency(room.pricePerNight * guestData.days) }}
        </p>
        <button class="nav-btn mt-2" @click="navToDetails()">
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "./Star.vue";
import currency from "../../mixins/Filters";

export default {
  components: {
    Star,
  },
  props: {
    room: {
      type: Object,
      required: false
    },
    guestData: {
      type: Object,
      required: false
    },
  },
  methods: {
    navToDetails() {
      this.$emit("sendSelectedRoomData", this.room)
      this.$router.push({ name: "detail" })
    }
  },
  mixins: [currency],
  computed: {
    roomId() {
      return this.room._id
    },
    setRatingText() {
      if (this.room.rating > 9) return "Wonderful";
      else if (this.room.rating > 8.5) return "Excellent";
      else if (this.room.rating > 8) return "Very Good";
      else return "Good";
    },
  },
};
</script>

<style scoped>
.room-card {
  box-shadow: 0 0 0 2px rgb(29, 246, 0), 8px 0 0 0 rgba(29, 246, 0);

}

.card-img {
  max-height: 200px;
  max-width: 200px;
}

.card-title {
  font-weight: 700;
}

.card-text {
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.rating {
  font-size: 16px;
  font-weight: 500;
  width: 32px;
  height: 32px;
  background-color: navy;
  color: white;
  border-radius: 5px 5px 5px 0;
}

small {
  font-size: 12px;
  font-weight: 400;
  color: rgb(107, 107, 107);
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
  border: none;
}

.nav-btn:active {
  box-shadow: none;
  transform: translate(4px, 4px);
}
</style>
