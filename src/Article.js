import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Article = ({ title, author, source, image, content, url }) => {

    return (

        <Card style={{ width: '30rem' }}>
            <Card.Img variant="top" src={image} alt="" width="300vh" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Title>{author}</Card.Title>
                <Card.Title>{source}</Card.Title>

                <Card.Text>{content}</Card.Text>
                <a href={url} target="_blank" rel="noopener noreferrer"> go to article</a>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>


        </Card>
    );
}

export default Article;