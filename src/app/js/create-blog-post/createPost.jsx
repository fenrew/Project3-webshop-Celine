import React, { Component } from "react";
import api from "../utils/api";
import BlogForm from "./BlogForm";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: false,
      loading: false,
      postCreated: false,
      header: "",
      oneline: "",
      info: "",
      mainPicture: undefined,
      img: []
    };

    this._handleChange = this._handleChange.bind(this);
    this._addPicture = this._addPicture.bind(this);
    this._uploadImage = this._uploadImage.bind(this);
    this._createBlog = this._createBlog.bind(this);
  }

  componentDidMount() {
    api.get("/api/user/admin").then(result => {
      if (!result.response) return;
      this.setState({
        admin: true
      });
    });
  }

  render() {
    if (!this.state.admin)
      return (
        <div>
          <div className="navigation-fix" />
          <h1>You must be admin to enter here!</h1>
        </div>
      );

    if (this.state.loading)
      return (
        <div>
          <div className="navigation-fix" />
          <h1>Lager post, vent litt!</h1>
        </div>
      );

    return (
      <div>
        <div className="navigation-fix" />
        <h1 className="create-blog-header">Nytt blogg innlegg</h1>
        <BlogForm
          handleChange={this._handleChange}
          header={this.state.header}
          info={this.state.info}
          img={this.state.img}
          addPicture={this._addPicture}
          createEvent={this._createEvent}
          uploadImage={this._uploadImage}
          createBlog={this._createBlog}
        />
      </div>
    );
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  _addPicture(value) {
    let newArray = this.state.img;
    if (!newArray) newArray = [];
    newArray.push(value);
    this.setState({
      img: newArray
    });
  }

  _uploadImage() {
    cloudinary.openUploadWidget(
      { cloud_name: "demo", upload_preset: "a5vxnzbp" },
      function(error, result) {
        console.log(error, result);
      }
    );
  }

  _createBlog() {
    const pictureDeclaration = { picture: this.state.mainPicture };
    let response = api.post(
      "/api/blog-post",
      {
        header: this.state.header,
        oneliner: this.state.oneliner,
        info: this.state.info,
        img: this.state.img
      },
      pictureDeclaration
    ).then(result => {
      console.log("RESULT", result)
    })
    if (response) {
      this.setState({
        loading: true
      });
    }
  }
}

export default CreatePost;
