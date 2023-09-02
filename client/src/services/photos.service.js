import createApiClient from "./api.service";
class photosService {
  constructor(baseUrl = "/photos") {
    this.api = createApiClient(baseUrl);
  }
  async getAllPhotos() {
    return (await this.api.get("/getAllPhotos")).data;
  }
  async deleteAllPhotos() {
    return (await this.api.delete("/deleteAllPhotos")).data;
  }
}
export default new photosService();
