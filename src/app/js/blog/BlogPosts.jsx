import React from 'react';
import { Link } from "react-router-dom";

const BlogPosts = props => {
    return (
        <div className="each-blog-post">
            <h1>{props.header}</h1>
            <p>{props.paragraph}<b> <br/>... <a href="http://www.celineheldrup.no/">Les mer!</a></b></p>
            <img src={props.img} alt="" className="blog-images"/>
        </div>
    );
};

export default BlogPosts;