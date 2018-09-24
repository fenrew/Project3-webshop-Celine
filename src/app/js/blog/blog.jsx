import React, { Component } from "react";
import BlogForm from "./BlogForm";
import CreatePost from "./CreatePost";

class blog extends Component {
  render() {
    return (
      <div>
          <div className="navigation-fix"></div>
        <BlogForm />
      </div>
    );
  }
}

export default blog;
