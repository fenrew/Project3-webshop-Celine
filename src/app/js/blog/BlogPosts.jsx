import React from 'react';
import { Link } from "react-router-dom";

const BlogPosts = props => {
    return (
        <div className="each-blog-post">
            <h1>{props.header}</h1>
            <p>{props.paragraph} ..... <br/></p>
            <img src={props.img} alt="" className="blog-images"/> <br/>
            <b> <a target="_blank" rel="noopener noreferrer" href="http://www.celineheldrup.no/">Les mer!</a></b>
        </div>
    );
};

export default BlogPosts;