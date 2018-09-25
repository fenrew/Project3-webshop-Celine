import React, { Component } from "react";
import BlogForm from "./BlogForm";
import CreatePost from "./CreatePost";
import BlogPosts from "./BlogPosts";
import api from "../utils/api";

class blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogposts: "",
      loading: true
    };
  }

  componentDidMount() {
    api.get("/api/blog").then(result => {
      console.log(result);
      let headOne = result.headerOneText;
      let headTwo = result.headerTwoText;
      let headThree = result.headerThreeText;
      let paraOne = result.paragraphOneText;
      let paraTwo = result.paragraphTwoText;
      let paraThree = result.paragraphThreeText;
      let imgOne = result.imgOne
      let imgTwo = result.imgTwo
      let imgThree = result.imgThree
      let blogposts = [
        {header: headOne, paragraph: paraOne, img: imgOne},
        {header: headTwo, paragraph: paraTwo, img: imgTwo},
        {header: headThree, paragraph: paraThree, img: imgThree},
      ]
      this.setState({
        blogposts: blogposts,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="navigation-fix" />
          <h1>Loading...</h1>
        </div>
      );
    }
    console.log(this.state.blogposts)

    let mappedBlogs = this.state.blogposts.map((el, index) => (
      <BlogPosts 
      header={el.header}
      paragraph={el.paragraph}
      img={el.img}
      key={index}
      />
    ))

    return (
      <div>
        <div className="navigation-fix" />
        <div className="blog-site-container">
        <div className="the-whole-blog-container">
        {mappedBlogs}
        </div>
        </div>
      </div>
    );
  }
}

export default blog;
