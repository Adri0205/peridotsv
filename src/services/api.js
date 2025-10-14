import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://peridot-api.manguitosv.com",
});
