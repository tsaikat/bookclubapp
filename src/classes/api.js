import { API_HOST } from "@/config/config";
import ApiManager from "./ApiManager";

const api = new ApiManager(API_HOST);

export default api;
