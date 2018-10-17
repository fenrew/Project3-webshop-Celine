import React from "react";

const LatestBlog = props => {
  let imageStyle = {
    backgroundImage: "url('" + props.post.mainPicture + "')"
  };
  return (
    <div className="latest-blog-post-container">
      <div className="latest-blog-post-background-image" style={imageStyle}>
      <div className="latest-blog-border-container">
        <div className="latest-blog-post-text-container">
          <h1 className="latestblog-header">{props.post.header}</h1>
          <div className="latestblog-oneliner">{props.post.oneliner}</div>
          <button className="latestblog-button" onClick={() => props.onClickHandler(props.post)}>Les mer</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LatestBlog;
