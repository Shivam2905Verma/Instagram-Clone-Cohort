import { useParams } from "react-router-dom";
import "../style/profile.scss";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../GlobalContext";

const Profile = () => {
  const { user } = useContext(GlobalContext);
  const [profilePost, setProfilePost] = useState(true);

  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="prfile-top">
          <div className="profile-info">
            <div className="profile-info-image">
              <img src={user?.profile_image} alt="user profile picture" />
            </div>
            <div className="profile-info-text">
              <h1>{user?.username}</h1>
              <h3>bio</h3>
              <div className="profile-info-text-follower">
                <p>0 post</p>
                <p>0 follower</p>
                <p>0 following</p>
              </div>
            </div>
          </div>
          <div className="profile-btns">
            <div className="profile-btn profile-btn-edit">Edit profile</div>
            <div className="profile-btn profile-btn-archieve">
              View archieve
            </div>
          </div>
        </div>


        <div className="profile-mid-btns">
          <div onClick={()=>{setProfilePost(true)}}
            className={`profile-mid-btn ${profilePost ? "profile-mid-btn-curr" : ""}`}
          >
            <i class="ri-layout-grid-fill"></i>
          </div>
          <div
          onClick={()=>{
            setProfilePost(false)
          }}
            className={`profile-mid-btn ${profilePost ? "" : "profile-mid-btn-curr"}`}
          >
            <i className="ri-bookmark-line"></i>
          </div>
        </div>



        <div className="profile-bottom"></div>
      </div>
    </div>
  );
};

export default Profile;
