import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function loadUserProfileData() {
  try {
    const res = await api.get("/api/post/getAllPostOfUser");
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
