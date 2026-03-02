import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export async function loadData() {
  try {
    const res = await api.get("/api/post/feed");
    return res.data;
  } catch (error) {
    console.log("There is a error in loading data");
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    console.log("this error from getme");
  }
}
