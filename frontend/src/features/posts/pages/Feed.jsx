import { useContext } from "react";
import { GlobalContext } from "../../../GlobalContext";
import FeedCard from "../components/FeedCard";
import { useFeed } from "../hooks/useFeed";
import "../style/feed.scss";

const Feed = () => {
  const { data } = useFeed();
   const {user , setUser} = useContext(GlobalContext)
  return (
     <div className="feedContainer">
      <div className="feedtop">
        <h2>Instagram</h2>
        <div className="feedtop-right">
          <input className="feedsearch" placeholder="Search" type="text" />
          <i className="ri-heart-line"></i>
        </div>
      </div>

      <div className="optionbar">
        <div className="optionbar-icon home">
          <i className="ri-home-line"></i>
        </div>
        <div className="optionbar-icon reels">
          <i className="ri-video-line"></i>
        </div>

        <div className="optionbar-icon message">
          <i className="ri-chat-4-line"></i>
        </div>
        <div className="optionbar-icon createPost">
          <i className="ri-add-large-line"></i>
        </div>
        <div className="optionbar-icon userprofile"><img src={user.profile_image} alt="" /></div>
      </div>

      <div className="allpost">
        {data?.map((post) => {
          return (
            <FeedCard
              key={post._id}
              caption={post.caption}
              postimg={post.imageUrl}
              userprofile={post.user.profile_image}
              username={post.user.username}
              isLiked={post.isLiked}
            />
          );
        })}
      </div>
    </div>
  );

};

export default Feed;
