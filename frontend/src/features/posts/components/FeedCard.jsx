const FeedCard = ({ caption, postimg, userprofile, username , isLiked }) => {
  return (
    <div className="post">
      <div className="posttop">
        <img src={userprofile} alt="userPorfile" />
        <p>{username}</p>
      </div>
      <div className="postimg">
        <img src={postimg} alt="userpost-image" />
      </div>
      <div className="postbottom">
        <div className="posticons">
          <div className="icons-left">
            <i className="ri-poker-hearts-line"></i>
            <i className="ri-chat-1-line"></i>
            <i className="ri-share-forward-line"></i>
          </div>
          <div className="icons-right">
            <i className="ri-bookmark-line"></i>
          </div>
        </div>
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default FeedCard;
