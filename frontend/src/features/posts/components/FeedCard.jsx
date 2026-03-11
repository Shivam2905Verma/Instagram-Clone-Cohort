import { useState } from "react";
import { LikePost, unLikePost } from "../services/feedApi";
import { Link } from "react-router-dom";

const FeedCard = ({
  postId,
  caption,
  postimg,
  userprofile,
  username,
  userId,
  postDate,
  isLiked,
}) => {
  const [postIsLiked, setPostIsLiked] = useState(false);

  async function onLike(postId) {
    try {
      const res = await LikePost(postId);
      console.log(res);
    } catch (error) {
      console.log("this error from likePost");
    }
  }
  async function onUnLike(postId) {
    try {
      const res = await unLikePost(postId);
      console.log(res);
    } catch (error) {
      console.log("this error from likePost");
    }
  }

  useState(() => {
    setPostIsLiked(isLiked);
  }, []);

  return (
    <div className="post">
      <Link to={`/profile/${userId}`}>
        <div className="posttop">
          <img src={userprofile} alt="userPorfile" />
          <p>{username}</p>
        </div>
      </Link>
      <div className="postimg">
        <img src={postimg} alt="userpost-image" />
      </div>
      <div className="postbottom">
        <div className="posticons">
          <div className="icons-left">
            {postIsLiked ? (
              <i
                onClick={() => {
                  onUnLike(postId);
                  setPostIsLiked(false);
                }}
                className="ri-heart-fill"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setPostIsLiked(true);
                  onLike(postId);
                }}
                className="ri-poker-hearts-line"
              ></i>
            )}

            <i className="ri-chat-1-line"></i>
            <i className="ri-share-forward-line"></i>
          </div>
          <div className="icons-right">
            <i className="ri-bookmark-line"></i>
          </div>
        </div>
        <p className="postDate">{postDate.split("T")[0]}</p>
        <p className="postCaption">{caption}</p>
      </div>
    </div>
  );
};

export default FeedCard;
