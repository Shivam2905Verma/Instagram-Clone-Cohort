import { Link } from "react-router-dom";
import "../style.scss";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const SideBar = () => {
  const { user, setcreatePostVisible } = useContext(GlobalContext);

  return (
    <div className="optionbar">
      <Link to={"/"}>
        <div className="optionbar-icon home">
          <i className="ri-home-line"></i>
        </div>
      </Link>
      <div className="optionbar-icon reels">
        <i className="ri-video-line"></i>
      </div>
      <div
        onClick={() => setcreatePostVisible(true)}
        className="optionbar-icon createPost"
      >
        <i className="ri-add-large-line"></i>
      </div>
      <div className="optionbar-icon message">
        <i className="ri-chat-4-line"></i>
      </div>
      <Link to={`/profile/${user?._id}`}>
        <div className="optionbar-icon userprofile">
          <img src={user?.profile_image} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
