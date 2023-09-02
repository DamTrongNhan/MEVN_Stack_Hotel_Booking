<template>
  <TheHeader />
  <div v-if="!roomData" class="d-flex justify-content-center">
    <div class="lds-hourglass"></div>
  </div>
  <main v-else>
    <router-view @setGuestData="getGuestData" :guestData="guestData" @sendSelectedRoomData="getSelectedRoomData"
      :selectedRoomData="selectedRoomData" @sendAllGuestInfo="getAllGuestInfo" :allGuestInfo="allGuestInfo"
      :roomData="roomData" />
  </main>
  <BackToTop />
  <TheFooter />
</template>
<script>
import TheHeader from "../../components/pages/TheHeader.vue";
import TheFooter from "../../components/pages/TheFooter.vue";
import roomService from "../../services/room.service"
import BackToTop from "../../components/pages/BackToTop.vue"
export default {
  data() {
    return {
      roomData: null,
      guestData: null,
      selectedRoomData: null,
      allGuestInfo: null,
    };
  },
  props: {

  },
  components: {
    TheHeader,
    TheFooter,
    BackToTop
  },
  methods: {
    getGuestData(data) {
      this.guestData = data;
    },
    getAllGuestInfo(data) {
      this.allGuestInfo = data;
    },
    getSelectedRoomData(data) {
      this.selectedRoomData = data;
    },
  },
  async created() {
    try {
      const result = await roomService.getAll();
      this.roomData = result.dataRoom;
    }
    catch (err) {
      console.error(err);
    }

  },
  mounted() {
    if (localStorage.getItem("guestData")) {
      try {
        this.guestData = JSON.parse(localStorage.getItem("guestData"));
      } catch (e) {
        localStorage.removeItem("guestData");
      }
    }
    if (localStorage.getItem("selectedRoomData")) {
      try {
        this.selectedRoomData = JSON.parse(localStorage.getItem("selectedRoomData"));
      } catch (e) {
        localStorage.removeItem("selectedRoomData");
      }
    }
    if (localStorage.getItem("allGuestInfo")) {
      try {
        this.allGuestInfo = JSON.parse(localStorage.getItem("allGuestInfo"));
      } catch (e) {
        localStorage.removeItem("allGuestInfo");
      }
    }
  },

  watch: {
    guestData(newData) {
      const parsed = JSON.stringify(newData);
      localStorage.setItem("guestData", parsed);
    },
    selectedRoomData(newData) {
      const parsed = JSON.stringify(newData);
      localStorage.setItem("selectedRoomData", parsed);
    },
    allGuestInfo(newData) {
      const parsed = JSON.stringify(newData);
      localStorage.setItem("allGuestInfo", parsed);
    },
  },

};

</script>
<style>
@import "../../assets/css/loader.css"
</style>
    