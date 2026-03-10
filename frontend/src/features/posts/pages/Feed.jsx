import FeedCard from "../components/FeedCard";
import { useFeed } from "../hooks/useFeed";
import "../style/feed.scss";

const Feed = () => {
  const { feedData, loading } = useFeed();

  if (loading) {
    return (
      <div className="Loadingpage">
        <h1>Loading....</h1>
      </div>
    );
  }

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
        {feedData?.map((post) => {
          return (
            <FeedCard
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postimg={post.imageUrl}
              userprofile={post.user.profile_image}
              username={post.user.username}
              isLiked={post.isLiked}
            />
          );
        })}
        <div className="forMargin"></div>
      </div>
    </div>
  );
};

export default Feed;
