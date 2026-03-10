import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export async function loadData() {
  try {
    const response = await api.get("/api/post/feed");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function LikePost(postId) {
  try {
    const response = await api.post(`/api/post/like/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function unLikePost(postId) {
  try {
    const response = await api.post(`/api/post/unlike/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
