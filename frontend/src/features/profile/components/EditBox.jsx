import "../style/profile.scss";
import useProfile from "../hooks/useProfile";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../GlobalContext";

const EditBox = () => {
  const { editBoxOpen, setEditBoxOpen, handleUpdateUserProfile, loading } =
    useProfile();
  const { user , setUser } = useContext(GlobalContext);

  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [preview, setPreview] = useState(user?.profile_image);

  async function editUserProfile() {
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("username", username);
      formData.append("bio", bio);

      const res = await handleUpdateUserProfile(formData);
      setUser(res.user);
      setEditBoxOpen(false);
    } catch (error) {
      console.log("this is error from update user profile", error);
    }
  }

  if (loading) {
    return (
      <div
        onClick={() => setEditBoxOpen(false)}
        className={`editProfileBox-Overlay ${editBoxOpen ? "" : "hide"}`}
      >
        <div onClick={(e) => e.stopPropagation()} className="editProfileBox">
          <div className="Loadingpage">
            <h1>Loading....</h1>
          </div>
        </div>
      </div>
    );
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
          <img src={preview} alt="prfile pciture" />
        </label>
        <input
          onChange={(e) => {
            setProfileImage(e.target.files[0]);
            if (e.target.files[0]) {
              setPreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
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
          value={bio}
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
