import React from "react";

const AllBlogPosts = props => {
  let imageStyle = {
    backgroundImage: "url('" + props.post.mainPicture + "')"
  };
  return (
    <div className="allposts-each-post-container">
      <div className="allposts-each-post-white">
        <div className="allposts-background-image" style={imageStyle}>
          <div className="latest-blog-border-container">
          <div className="latest-blog-post-text-container"> 
            <h1 className="allposts-header">{props.post.header}</h1>
            <div className="allposts-oneliner">{props.post.oneliner}</div><br/>
            <button
              className="allposts-button"
              onClick={() => props.onClickHandler(props.post)}
            >
              Les mer
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogPosts;
