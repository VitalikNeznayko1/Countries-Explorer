import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
});

export default apiClient;
