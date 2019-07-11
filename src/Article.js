import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Article = ({ title, author, source, image, content, url }) => {

    return (

        <Card style={{ width: '30rem', margin: '2em' }}>
        <Card.Header>{title}</Card.Header>
            <Card.Img variant="top" src={image} alt="" width="300vh" />
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Title>{source}</Card.Title>
                <Card.Text>{content}</Card.Text>
                
                <Button variant="primary"><a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}> go to article</a></Button>
            </Card.Body>


        </Card>
    );
}

export default Article;