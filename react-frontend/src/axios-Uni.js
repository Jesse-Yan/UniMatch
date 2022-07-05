import axios from "axios";

const axiosUni = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default axiosUni;
