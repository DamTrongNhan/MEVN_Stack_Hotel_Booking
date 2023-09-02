<template>
    <a-card title="Thông tin đặt phòng" style="width: 100%">
        <div class="d-flex justify-content-start justify-content-center flex-column">
            <div class="d-flex justify-content-start align-items-start">
                <div class="mb-3 room-info">
                    <h2 class="mb-3">
                        Booking Details
                    </h2>
                    <p class="m-0 mb-1">
                        <b>
                            Room Code:
                        </b>
                        {{ booking.room_id }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Check-in Date:
                        </b>
                        {{ `${new Date(booking.checkoutDate).getDate()}-${new Date(booking.checkoutDate).getMonth() +
                            1}-${new Date(booking.checkoutDate).getFullYear()}` }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Check-out Date:
                        </b>
                        {{ `${new Date(booking.checkoutDate).getDate()}-${new Date(booking.checkoutDate).getMonth() +
                            1}-${new Date(booking.checkoutDate).getFullYear()}` }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Guests:
                        </b>
                        {{ booking.guest ? booking.guest.length : 0 }}
                    </p>
                    <!-- <p class="m-0 mb-1">
                        <b>
                            Room Type:
                        </b>
                        {{ guestData.roomType }} Room(s)
                    </p> -->
                    <!-- <p class="m-0 mb-1">
                        <b>
                            Bed:
                        </b>
                        {{ selectedRoomData.bed }}
                    </p> -->
                    <p class="m-0 mb-1">
                        <b>
                            Nights:
                        </b>
                        {{ booking.nights }} night
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Total Price:
                        </b>
                        {{ formatCurrency(booking.total_price) }}
                    </p>
                    <p class="m-0 mb-1">
                        <b>
                            Hình thức thanh toán:
                        </b>
                        {{ booking.bookingType }}
                    </p>
                </div>
            </div>
            <div class="d-flex flex-wrap gap-5 mb-4">
                <div v-for="( guest, index ) in  booking.guest " :key="index" class="guest-info">
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
        </div>
    </a-card>
</template>

<script >
import { useMenu } from '../../store/use-menu'
import currency from "../../mixins/Filters"
import bookingService from "../../services/booking.service";

export default {
    data() {
        const menu = useMenu();
        return { menu, booking: {} }
    },
    props: { id: { type: String } },
    mixins: [currency],
    async created() {
        try {
            const result = await bookingService.getBookingById(this.id);
            if (result.booking)
                this.booking = result.booking;
        } catch (error) {
            console.error(error);
        }
    },
    async mounted() {
        this.menu.onSelectedKeys(["admin-booking"]);
    },

}
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
