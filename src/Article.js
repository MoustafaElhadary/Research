import React from 'react'

const Article = ({title,author,source,image,content,url}) =>{

    return(

        <div>
            <h1>{title}</h1>
            <h1>{author}</h1>
            <h1>{source}</h1>
            <img src={image} alt=""/>
            <p>{content}</p>
            <a href={url} target="_blank" rel="noopener noreferrer"> go to article</a>

        </div>
    );
}

export default Article;