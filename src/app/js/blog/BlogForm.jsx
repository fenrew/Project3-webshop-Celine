import React from 'react';

const BlogForm = () => {
    return (
        <div>
            <input type="text" placeholder="Overskrift"/>
            <br/>
            <input type="text" placeholder="Ett utdrag"/>
            <br/>
            <textarea rows="6" cols="100" placeholder="Skriv bloggen her..."></textarea>
            <br/>
            <input type="file" placeholder="Legg til bilde"/>
        </div>
    );
};

export default BlogForm;