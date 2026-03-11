import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function loadUserProfilePost(id) {
  try {
    const res = await api.get(`/api/post/user/${id}`);
    return res.data;
  } catch (error) {
    throw error
  }
}

export async function loadUserProfileData(id) {
  try {
    const res = await api.get(`/api/auth/userprofiledata/${id}`);
    return res.data;
  } catch (error) {
    throw error
  }
}

export async function updateUserProfile(formData){
  try {
    const res = await api.post("/api/auth/updateprofile" , formData);
    return res.data; 
  } catch (error) {
    throw error
  }
}

export async function followUser(id){
  try {
    const res = await api.post(`/api/user/follow/${id}`);
    return res.data; 
  } catch (error) {
    throw error
  }
}

export async function unFollowUser(id){
  try {
    const res = await api.post(`/api/user/unfollow/${id}`);
    return res.data; 
  } catch (error) {
    throw error
  }
}

export async function isFollowed(id){
  try {
    const res = await api.get(`/api/user/isFollowed/${id}`);
    return res.data; 
  } catch (error) {
    throw error
  }
}
