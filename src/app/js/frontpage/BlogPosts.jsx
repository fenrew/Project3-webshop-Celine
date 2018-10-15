import React, { Component } from "react";
import api from "../utils/api";
import LatestBlog from "./LatestBlog";

class BlogPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      blogposts: []
    };
  }

  componentDidMount() {
    api.get("/api/latest/blogposts").then(result => {
      this.setState({
        blogposts: result.posts,
        loading: false,
      });
    });
  }

  render() {
    if(this.state.loading) return (
        <h1>Loading...</h1>
    )

    return (
        <div>
            <LatestBlog
            post = {this.state.blogposts[0]}
            />
        </div>
    )
  }
}

export default BlogPosts;
