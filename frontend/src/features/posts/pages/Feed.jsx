import { useEffect } from "react";
import FeedCard from "../components/FeedCard";
import { useFeed } from "../hooks/useFeed";
import "../style/feed.scss";
import { loadData } from "../services/feedApi";

const Feed = () => {
  const { data, setData } = useFeed();

  async function loadFeed() {
    try {
      const res = await loadData();
      setData(res.feed);
    } catch (error) {
      console.log("this is the error in the feed.jsx" , error);
    }
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="feedContainer">
      <div className="feedtop">
        <h2>Instagram</h2>

        <div className="feedtop-right">
          <input className="feedsearch" placeholder="Search" type="text" />
          <i className="ri-heart-line"></i>
        </div>
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
