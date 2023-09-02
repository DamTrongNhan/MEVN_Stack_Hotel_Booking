import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/user") {
    this.api = createApiClient(baseUrl);
  }
  async getAllUser() {
    return (await this.api.get(`/getAllUser`)).data;
  }
  async getAllAdmin() {
    return (await this.api.get(`/getAllAdmin`)).data;
  }
  async getOne(id) {
    return (await this.api.get(`/getOne/${id}`)).data;
  }
  async signIn(data) {
    return await this.api.post("/signIn", data);
  }
  async signUp(data) {
    return await this.api.post("/signUp", data);
  }
  async create(data) {
    return (
      await this.api.post("/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  async checkUser(token) {
    return (
      await this.api.get(`/checkUser`, {
        headers: { Authorization: token },
      })
    ).data;
  }

  async update(id, data) {
    return (
      await this.api.patch(`/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  async toggle(id, data) {
    return (await this.api.patch(`/toggle/${id}`, data)).data;
  }
  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async search(data) {
    return (await this.api.get(`/search`, { params: { data } })).data;
  }
}
export default new UserService();
