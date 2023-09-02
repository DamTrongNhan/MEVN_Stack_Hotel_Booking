<template>
  <main class="main">
    <div class="title">
      <div class="d-flex flex-column align-items-center">
        <h4 class="room-title m-0 mb-2">
          Phòng số {{ selectedRoomData.roomNumber }}
        </h4>
        <Star class="" :num="selectedRoomData.star" />
      </div>
      <h4 class="room-title">
        {{ selectedRoomData.roomType }}
      </h4>
    </div>
    <div class="book">
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(item, index) in selectedRoomData.photos" :key="index" class="carousel-item"
            :class="index === 1 ? 'active' : ''">
            <img :src="`http://localhost:3000/assets/uploads/${item.name}`" class="d-block w-100 rounded" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">
            Previous
          </span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">
            Next
          </span>
        </button>
      </div>
      <div class="booking-details">
        <h2 class="heading mb-4">
          Booking Details
        </h2>
        <div class="border-2 border-success border rounded p-3 d-flex align-items-start justify-content-between mb-3">
          <div>
            <p class="m-0 details-heading">
              Check-in Date
            </p>
            <p class="m-0 details-body">
              {{ guestData.checkinDate }}
            </p>
            <small class="m-0">
              From 7:00 AM
            </small>
          </div>
          <div>
            <p class="m-0 details-heading">
              Check-out Date
            </p>
            <p class="m-0 details-body">
              {{ guestData.checkoutDate }}
            </p>
            <small class="m-0">
              {{ guestData.days }} night(s) stay
            </small>
          </div>
          <div>
            <p class="m-0 details-heading">
              Guests
            </p>
            <p class="m-0 details-body">
              {{ guestData.adult }} Adult(s)
            </p>
            <p v-if="guestData.children !== 0" class="m-0 details-body">
              {{ guestData.children }} Children
            </p>
          </div>
        </div>
        <div class="border-2 border-success border rounded p-3 d-flex align-items-start justify-content-between mb-4">
          <div>
            <p class="m-0 details-heading">
              Room Price
            </p>
            <p class="m-0 details-body">
              {{
                formatCurrency(selectedRoomData.pricePerNight * guestData.days)
              }}
            </p>
          </div>
          <div>
            <p class="m-0 details-heading">
              Kind of bed
            </p>
            <p class="m-0 details-body">
              {{
                selectedRoomData.bed
              }}
            </p>
          </div>
          <div>
            <p class="m-0 details-heading">
              Total Price
            </p>
            <p class="m-0 details-body">
              {{
                formatCurrency(selectedRoomData.pricePerNight * guestData.days)
              }}
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <router-link :to="{
                name: 'Reservation',
              }" class="nav-btn">
            Book Now
          </router-link>
        </div>
      </div>
    </div>
    <div class="mt-5 description p-3" v-html="selectedRoomData.description">
    </div>
  </main>
</template>

<script>
import Star from "../../components/pages/Star.vue";
import currency from "../../mixins/Filters";

export default {
  props: {
    guestData: {
      type: Object,
      required: false,
    },
    roomData: {
      type: Array,
      required: false,
    },
    selectedRoomData: {
      type: Object,
      required: false,
    }
  },
  components: {
    Star,
  },
  mixins: [currency],
  methods: {

  },
  created() {
  },
  mounted() {
  }
};
</script>
<style scoped>
@import "../../assets/css/ant.css";

.main {
  padding: 50px 50px 50px 50px;
}

.title {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 40px;
  grid-gap: 20px;
  padding: 20px;
  align-items: center;
  justify-items: center;
  box-shadow: 0 0 0 2px rgb(29, 246, 0), -8px -8px 0 0 rgba(29, 246, 0);



}

small {
  font-size: 14px;
  font-weight: 400;
  color: #6b6b6b;
}

.blue {
  color: blue;
}

.book {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.hotel-title {
  font-size: 25px;
  font-weight: 700;
}

.heading {
  font-size: 24px;
  font-weight: 600;
}

.details-heading {
  font-size: 14px;
  font-weight: 700;
}

.details-body {
  font-size: 16px;
  font-weight: 700;
  color: blue;
}

.description {
  box-shadow: 0 0 0 2px rgb(29, 246, 0), 8px 8px 0 0 rgba(29, 246, 0);
}

.nav-btn {
  background-color: #198754;
  color: white;
  transition: all 0.2s linear;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px 40px;
  box-shadow: 6px 6px rgb(29, 246, 0);
  cursor: pointer;
  text-decoration: none;
}

.nav-btn:active {
  box-shadow: none;
  transform: translate(4px, 4px);
}

@media only screen and (max-width: 1000px) {
  .book {
    grid-template-columns: 1fr;
  }

  .booking-details {
    width: 100%;
  }
}
</style>
