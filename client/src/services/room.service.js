import createApiClient from "./api.service";
class RoomService {
  constructor(baseUrl = "/room") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (
      await this.api.post("/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async getOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async updateOne(id, data) {
    return (
      await this.api.patch(`/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async search(query) {
    return (await this.api.get(`/search`, { params: query })).data;
  }
}
export default new RoomService();
