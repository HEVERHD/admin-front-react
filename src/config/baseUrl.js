import axios from "axios";

const baseURL = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:3000/api/",
});

export default baseURL;
