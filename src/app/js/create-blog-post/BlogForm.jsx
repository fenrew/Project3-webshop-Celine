import React from "react";

const BlogForm = props => {
  return (
    <div className="create-blog-form-container">
      <br />
      <br />
      <div>
        <input
          type="text"
          placeholder="Overskrift"
          onChange={evt => props.handleChange("header", evt.target.value)}
          value={props.header}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Skriv en settning om den"
          onChange={evt => props.handleChange("oneliner", evt.target.value)}
          value={props.oneliner}
        />
      </div>
      <div>
        <textarea
          rows="18"
          cols="150"
          placeholder="Skriv bloggen her..."
          onChange={evt => props.handleChange("info", evt.target.value)}
          value={props.info}
        />
      </div>
      <div>
        <input
          type="file"
          value={props.picture}
          onChange={evt =>
            props.handleChange("mainPicture", evt.target.files[0])
          }
          placeholder="Hovedfigur bilde"
        />
      </div>
      <div>
        <br />
        <div>Legg til slide-show bilder:</div>
        <button
          className="upload-image-blog"
          onClick={() => props.uploadImage()}
        >
          Legg til bilder
        </button>
      </div>
      <br />
      <button className="add-blog-button" onClick={() => props.createBlog()}>
        Post Blogg innlegget
      </button>
    </div>
  );
};

export default BlogForm;
