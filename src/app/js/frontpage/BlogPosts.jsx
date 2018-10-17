import React, { Component } from "react";
import api from "../utils/api";
import LatestBlog from "./LatestBlog";
import SpecificPost from "./SpecificPost";

class BlogPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      blogposts: [],
      specificPost: false,
      singlePost: "",
    };

    this._clickGoBack = this._clickGoBack.bind(this)
    this._onClickHandler = this._onClickHandler.bind(this)
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

    if(this.state.specificPost) return (
      <div>
        <SpecificPost 
        post = {this.state.singlePost}
        clickGoBack = {this._clickGoBack}
        />
      </div>
    )

    return (
        <div>
            <LatestBlog
            post = {this.state.blogposts[0]}
            onClickHandler = {this._onClickHandler}
            />
        </div>
    )
  }

  _onClickHandler(post) {
    this.setState({
      specificPost: true,
      singlePost: post,
    })
  }

  _clickGoBack() {
    this.setState({
      specificPost: false,
      singlePost: ""
    });
  }
}

export default BlogPosts;
