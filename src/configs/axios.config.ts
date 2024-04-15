import axios from "axios";
import { onRequestFulFilled, onRequestReject, onResponseFulFilled, onResponseReject } from "@/interceptors";

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/v${import.meta.env.VITE_API_VERSION}/`;
axios.interceptors.request.use(onRequestFulFilled, onRequestReject);
axios.interceptors.response.use(onResponseFulFilled, onResponseReject);

export default axios;
