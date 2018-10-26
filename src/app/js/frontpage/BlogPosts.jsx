import React, { Component } from "react";
import api from "../utils/api";
import LatestBlog from "./LatestBlog";
import SpecificPost from "./SpecificPost";
import AllBlogPosts from "./AllBlogPosts";
import SocialMedia from "./SocialMedia";
import ReactDOM from "react-dom";

class BlogPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      blogposts: [],
      specificPost: false,
      singlePost: "",
      showPosts: 5,
    };

    this.myRef = React.createRef();

    this._clickGoBack = this._clickGoBack.bind(this);
    this._onClickHandler = this._onClickHandler.bind(this);
    this.scrollToDomRef = this.scrollToDomRef.bind(this);
    this._toOlderPosts = this._toOlderPosts.bind(this)
  }

  componentDidMount() {
    api.get("/api/latest/blogposts").then(result => {
      this.setState({
        blogposts: result.posts,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) return <h1>Loading...</h1>;

    const mappedPosts = this.state.blogposts.map((el, index) => {
      if (index > this.state.showPosts) return;
      return (
        <AllBlogPosts
          post={el}
          onClickHandler={this._onClickHandler}
          scrollToDomRef={this.scrollToDomRef}
          key={index}
        />
      );
    });

    if (this.state.specificPost)
      return (
        <div>
          <div className="frontpage-blog-social-container">
            <div ref={this.myRef}>
              <SpecificPost
                post={this.state.singlePost}
                clickGoBack={this._clickGoBack}
              />
            </div>
            <SocialMedia />
          </div>
          <div className="allposts-whole-container">{mappedPosts}</div>
          <div className="allposts-older-container" onClick={() => this._toOlderPosts()}>
          <span>Eldre innlegg</span>
          <div className="allposts-older-arrow">{"<"}</div>
        </div>
        </div>
      );

    return (
      <div>
        <div className="frontpage-blog-social-container">
          <div ref={this.myRef}>
            <LatestBlog
              post={this.state.blogposts[0]}
              onClickHandler={this._onClickHandler}
            />
          </div>
          <SocialMedia />
        </div>
        <div className="allposts-whole-container">{mappedPosts}</div>
        <div className="allposts-older-container" onClick={() => this._toOlderPosts()}>
          <span>Eldre innlegg</span>
          <div className="allposts-older-arrow">{"<"}</div>
        </div>
      </div>
    );
  }

  _onClickHandler(post) {
    this.setState({
      specificPost: true,
      singlePost: post
    });
    this.scrollToDomRef();
  }

  _clickGoBack() {
    this.setState({
      specificPost: false,
      singlePost: ""
    });
  }

  scrollToDomRef = () => {
    console.log(this.myRef.current);
    const myDomNode = ReactDOM.findDOMNode(this.myRef.current);
    myDomNode.scrollIntoView();
  };

  _toOlderPosts() {
    let newShowPosts = this.state.showPosts + 6;
    this.setState({
      showPosts: newShowPosts,
    });
  }
}

export default BlogPosts;
