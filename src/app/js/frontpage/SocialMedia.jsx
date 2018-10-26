import React, { Component } from "react";

class SocialMedia extends Component {
  render() {
    return (
      <div className="social-media-container">
        <div className="social-media-facebook social-media-items">
          {" "}
          <img
            src={
              "https://res.cloudinary.com/delw8osvu/image/upload/v1540367010/facebook-icon.png"
            }
            alt=""
            className="social-media-icon-img"
          /> 
          <br/>
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/celineheldrup.no/">Følg meg på Facebook!</a>
        </div>
        <div className="social-media-instagram social-media-items">
          {" "}
          <img
            src={
              "https://res.cloudinary.com/delw8osvu/image/upload/v1540367010/instagram-icon.png"
            }
            alt=""
            className="social-media-icon-img"
          /> 
          <br/>
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/celineheldrup/?hl=nb">Følg meg på Instagram!</a>
        </div>
        <div className="social-media-snapchat social-media-items">
          {" "}
          <img
            src={
              "https://res.cloudinary.com/delw8osvu/image/upload/v1540367010/snapchat-icon.png"
            }
            alt=""
            className="social-media-icon-img"
          /> 
          <br/>
          <div className="social-media-snapchat-text">Følg meg på snapchat:<br/>celineheldrup</div>
        </div>
      </div>
    );
  }
}

export default SocialMedia;
