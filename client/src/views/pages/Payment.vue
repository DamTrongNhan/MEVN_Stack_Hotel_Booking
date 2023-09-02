<!-- Xoa sach localstorage -->
<template>
  <main class="main">
    <!-- Hiện modal  -->
    <div v-if="paySuccess" class="payment-verification d-flex flex-column justify-content-evenly align-items-center">
      <div class="d-flex flex-column justify-content-evenly align-items-center">
        <p class="m-0 mb-4">
          Payment is successful
        </p>
        <i class="fa-sharp fa-solid fa-check success-icon mb-3"></i>
        <router-link :to="{ name: 'booking' }" class="text-decoration-none">Back to home page</router-link>
      </div>
    </div>

    <div v-if="!paySuccess" class="d-flex justify-content-center align-items-center flex-column">
      <div class="d-flex justify-content-start align-items-start">
        <div class="mb-3 room-info">
          <h2 class="mb-3">
            Booking Confirmation Details
          </h2>
          <p class="m-0 mb-1">
            <b>
              Room Number:
            </b>
            {{ selectedRoomData.roomNumber }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Check-in Date:
            </b>
            {{ guestData.checkinDate }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Check-out Date:
            </b>
            {{ guestData.checkoutDate }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Guests:
            </b>
            {{ guestData.adult }} Adult(s)
            <span v-if="guestData.children !== 0">
              , {{ guestData.children }} Children
            </span>
          </p>
          <p class="m-0 mb-1">
            <b>
              Room Type:
            </b>
            {{ guestData.roomType }} Room(s)
          </p>
          <p class="m-0 mb-1">
            <b>
              Bed:
            </b>
            {{ selectedRoomData.bed }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Nights:
            </b>
            {{ guestData.days }} night
          </p>
          <p class="m-0 mb-1">
            <b>
              Total Price:
            </b>
            {{ formatCurrency(totalPrice) }}
          </p>
        </div>
      </div>
      <div class="d-flex flex-wrap gap-5 mb-4">
        <div v-for="( guest, index ) in  allGuestInfo " :key="index" class="guest-info">
          <h2 class="h5">
            <b>
              Guest
            </b>
            {{ index + 1 }}
          </h2>
          <p class="m-0 mb-1">
            <b>
              Name:
            </b>
            {{ guest.name }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Identitiy No.:
            </b>
            {{ guest.CCCD }}
          </p>
          <p class="m-0 mb-1">
            <span class="me-4">
              <b>
                Sex:
              </b>
              {{ guest.sex }}
            </span>
            <span>
              <b>
                Age:
              </b>
              {{ guest.age }}
            </span>
          </p>
          <p class="m-0 mb-1">
            <b>
              E-mail:
            </b>
            {{ guest.email }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Phone:
            </b>
            {{ guest.phone }}
          </p>
          <p class="m-0 mb-1">
            <b>
              Comment
            </b>
            {{ guest.comment ? guest.comment : "No comment" }}
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-center gap-4 mt-2">
        <button class="mb-4 btn-head bg-info" @click="payVnpay()">
          Pay with vnpay
        </button>
        <button class="mb-4 btn-head bg-danger text-light" @click="payMomo()">
          Pay with Momo
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import currency from "../../mixins/Filters";
import bookingService from "../../services/booking.service"
export default {
  data() {
    return {
      paySuccess: false,
    };
  },
  props: {
    allGuestInfo: Array,
    guestData: Object,
    selectedRoomData: Object,
  },
  mixins: [currency],
  methods: {
    async payVnpay() {
      try {
        const { _id } = this.selectedRoomData
        const data = { _id, allGuestInfo: this.allGuestInfo, ...this.guestData }
        const result = await bookingService.addBooking(data)
        if (result.status) {
          await this.alert(result.status, "Đặt phòng thành công")
          this.paySuccess = true;
          localStorage.removeItem("guestData");
          localStorage.removeItem("selectedRoomData");
          localStorage.removeItem("allGuestInfo");
        }
        else {
          await this.alert(result.status, result.message)
        }
      }
      catch (err) {
        console.error(err);
      }
    },
    async payMomo() {

    },
    async alert(status, message) {
      const option = {
        icon: status ? "success" : "error",
        text: message,
        showConfirmButton: false,
        timer: 1000,
      };
      return await this.$swal(option);
    },
  },
  computed: {
    totalPrice() {
      return (
        this.selectedRoomData.pricePerNight * this.guestData.days
      );
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.main {
  padding: 40px 50px 50px 50px;
  /* background: url(../../../public/imgPage/payment.jpg) no-repeat center top;
  background-size: cover; */
  background-color: lightgreen;
  /* margin: 50px 0; */
}


.btn-head {
  color: black;
  transition: all 0.2s linear;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px 40px;
  font-weight: bold;
  box-shadow: 6px 6px teal;
  cursor: pointer;
  text-decoration: none;
  border: none;
}

.btn-head:active {
  box-shadow: none;
  transform: translate(4px, 4px);
}


.payment-verification {
  width: 40vw;
  height: 30vh;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 600;
}

.success-icon {
  font-size: 60px;
  color: green;
}

.room-info {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  background-color: teal;
}

.room-info h2 {
  color: snow;
  margin-bottom: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.room-info p {
  color: snow;
  font-size: 1.1rem;
  line-height: 140%;
}



.guest-info {
  background-color: rgb(240 253 244);
  border-radius: 0.375rem;
  padding: 20px;
  color: green;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 255, .2);
  transition: all .2s;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
}

.guest-info:hover {
  box-shadow: -12px 12px 2px -1px rgba(0, 0, 255, .2);
}
</style>
