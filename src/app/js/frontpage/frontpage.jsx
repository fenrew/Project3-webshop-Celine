import React, { Component } from "react";
import Carousel from "./Carousel";
import Information from "./Information"
import BlogPosts from "./BlogPosts"

class Frontpage extends Component {
  render() {
    return (
      <div className="frontpage-container">
        <Carousel />
        <Information />
        <BlogPosts />
      </div>
    );
  }
}

export default Frontpage;
