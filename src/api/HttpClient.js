import axios from "axios";
import { API_BASE_URL } from "./URLs";

export default class HttpClient {
  static getInstance() {
    return axios.create({
      baseURL: API_BASE_URL,
      timeout: 1000,
    });
  }
}