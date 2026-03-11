import "../style/profile.scss";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../GlobalContext";
import EditBox from "../components/EditBox";
import useProfile from "../hooks/useProfile";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(GlobalContext);
  const [profilePost, setProfilePost] = useState(true);
  const [isFollow, setIsFollow] = useState();
  const [profiledata, setProfiledata] = useState();

  const {
    setEditBoxOpen,
    profilePostdata,
    handleUserProfileData,
    handleUserProfilePosts,
    handleUserSavedData,
    handleFollowUser,
    handleIsFollowed,
    handleUnFollowUser,
  } = useProfile();

  const { id } = useParams();

  async function isFollowed(id) {
    try {
      const res = await handleIsFollowed(id);
      setIsFollow(res.isFollow);
    } catch (error) {
      console.log("This error come from unfollow", error);
    }
  }
  async function loadUserProfileData(id) {
    try {
      const res = await handleUserProfileData(id);
      setProfiledata(res.user);
    } catch (error) {
      console.log("This error come from load user Profile data", error);
    }
  }

  useEffect(() => {
    handleUserProfilePosts(id);
    isFollowed(id);
    loadUserProfileData(id);
  }, [id]);

  return (
    <div className="profileContainer">
      <EditBox />
      <div className="profile">
        <div className="prfile-top">
          <div className="profile-info">
            <div className="profile-info-image">
              <img
                src={profiledata?.profile_image}
                alt="user profile picture"
              />
            </div>
            <div className="profile-info-text">
              <h1>{profiledata?.username}</h1>
              <h3>{profiledata?.bio}</h3>
              <div className="profile-info-text-follower">
                <p>{profiledata?.numberOfPosts} post</p>
                <p>{profiledata?.followers} Followers</p>
                <p>{profiledata?.following} following</p>
              </div>
            </div>
          </div>
          <div className="profile-btns">
            {id !== user._id ? (
              <>
                {isFollow ? (
                  <div
                    onClick={() => {
                      setIsFollow(false);
                      handleUnFollowUser(id);
                    }}
                    className="profile-btn profile-btn-cancel"
                  >
                    Cancel
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setIsFollow(true);
                      handleFollowUser(id);
                    }}
                    className="profile-btn profile-btn-follow"
                  >
                    Follow
                  </div>
                )}

                <div className="profile-btn profile-btn-message">Message</div>
              </>
            ) : (
              <>
                <div
                  onClick={() => setEditBoxOpen(true)}
                  className="profile-btn profile-btn-edit"
                >
                  Edit profile
                </div>
                <div className="profile-btn profile-btn-archieve">
                  View archieve
                </div>
              </>
            )}
          </div>
        </div>

        <div className="profile-mid-btns">
          <div
            onClick={() => {
              setProfilePost(true);
              laodUserData(id);
            }}
            className={`profile-mid-btn ${profilePost ? "profile-mid-btn-curr" : ""}`}
          >
            <i className="ri-layout-grid-fill"></i>
          </div>
          <div
            onClick={() => {
              setProfilePost(false);
              handleUserSavedData();
            }}
            className={`profile-mid-btn ${profilePost ? "" : "profile-mid-btn-curr"}`}
          >
            <i className="ri-bookmark-line"></i>
          </div>
        </div>

        <div className="profile-bottom">
          <div className="allUserPosts">
            {profilePostdata?.map((img) => (
              <div className="allUserPosts-image" key={img.id || img.imageUrl}>
                <img src={img.imageUrl} alt="User contribution" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
