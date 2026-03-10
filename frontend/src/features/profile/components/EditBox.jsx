import "../style/profile.scss";
import useProfile from "../hooks/useProfile";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../GlobalContext";

const EditBox = () => {
  const { editBoxOpen, setEditBoxOpen, handleUpdateUserProfile } = useProfile();
  const { setUser } = useContext(GlobalContext);

  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  async function editUserProfile() {
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("username", username);
      formData.append("bio", bio);

      const res = await handleUpdateUserProfile(formData);
      setUser(res.user);
      setEditBoxOpen(false)
    } catch (error) {
      console.log("this is error from update user profile" , error);
    }
  }

  return (
    <div
      onClick={() => setEditBoxOpen(false)}
      className={`editProfileBox-Overlay ${editBoxOpen ? "" : "hide"}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="editProfileBox">
        <label
          className="editProfileBox-profileImg"
          htmlFor="editProfileBox-profileInput"
        >
          <img
            src="https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="prfile pciture"
          />
        </label>
        <input
          onChange={(e) => setProfileImage(e.target.files[0])}
          id="editProfileBox-profileInput"
          type="file"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          calue={bio}
          onChange={(e) => setBio(e.target.value)}
          type="text"
          placeholder="Bio"
        />
        <button onClick={editUserProfile} className="editProfileBox-btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBox;
