import React from 'react';

const SpecificPost = props => {
    let imageStyle = {
        backgroundImage: "url('" + props.post.mainPicture + "')"
      };
    let images = props.post.info.match(/https:\/\/res\.cloudinary\.com([^\s]+)/g)
    console.log(images)
    let textboxes = props.post.info.match(/.*/g)
    console.log(textboxes)

    let infoSection;
    return (
        <div className="specific-post-container">
        <div className="specific-post-minimize" onClick={() => props.clickGoBack()}>Vis mindre</div>
            <h1 className="specific-post-header">{props.post.header}</h1>
            <div className="specific-post-info">{props.post.info}</div>
            <div className="specific-post-image" style={imageStyle}></div>
            <br/>
            <br/>
        <div className="specific-post-minimize-two" onClick={() => props.clickGoBack()}>Vis mindre</div>
        </div>
    );
};

export default SpecificPost;