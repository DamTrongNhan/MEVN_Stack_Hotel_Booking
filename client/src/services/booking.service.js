import createApiClient from "./api.service";
class bookingService {
  constructor(baseUrl = "/booking") {
    this.api = createApiClient(baseUrl);
  }
  async addBooking(data) {
    return (await this.api.post("/addBooking", data)).data;
  }
  async getBooking() {
    return (await this.api.get("/getBooking")).data;
  }
  async getBookingById(id) {
    return (await this.api.get(`/getBookingById/${id}`)).data;
  }
  async getBookingBin() {
    return (await this.api.get(`/getBookingBin/`)).data;
  }
  async softDeleteBooking(id) {
    return (await this.api.patch(`/softDeleteBooking/${id}`)).data;
  }
  async forceDeleteBooking(id) {
    return (await this.api.delete(`/forceDeleteBooking/${id}`)).data;
  }
  async forceDeleteAllBooking(id) {
    return (await this.api.delete(`/forceDeleteAllBooking/`)).data;
  }
  async restoreBooking(id) {
    return (await this.api.patch(`/restoreBooking/${id}`)).data;
  }
}
export default new bookingService();
