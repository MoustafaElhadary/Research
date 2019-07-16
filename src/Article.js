import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import dateFormat from 'dateformat';


const Article = ({ title, author, source, image, content, url, publishedAt, twitter, email }) => {

    
    var date ;
    try {
        date = dateFormat(publishedAt, "longDate")
    }catch(err){
    }
    return (
        <div class="col-sm ">
            <Card border="info" style={{margin: '2em' }} className="shadow-lg rounded pb-5">
                <Card.Header>{title}</Card.Header>
                <Card.Img variant="top" src={image} alt="" width="300vh" />
                <Card.Body>
                    <Card.Text>{content}</Card.Text>{author}
                    <footer className="blockquote-footer"> <cite title="Source Title"> {source} / {date} </cite>
                    </footer>
                    <Button variant="primary"><a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}> go to article</a></Button>
                    {twitter} {email}
                </Card.Body>
            </Card>
        </div>

    );
}

export default Article;