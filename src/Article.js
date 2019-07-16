import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import dateFormat from 'dateformat';


const Article = ({ title, author, source, image, content, url, publishedAt, twitter, email }) => {


    var date;
    try {
        date = dateFormat(publishedAt, "longDate")
    } catch (err) {
    }
    return (
        // <div className="col-sm ">
        //     <Card border="info" style={{margin: '2em' }} className="shadow-lg rounded pb-5">
        //         <Card.Header  style={{fontSize:"4vw"}}>{title}</Card.Header>
        //         <Card.Img variant="top" src={image} alt="" style={{width: '80vw' }} className="img-fluid" />
        //         <Card.Body  style={{fontSize:"3vw"}}>
        //             <Card.Text >{content}</Card.Text>{author}
        //             <footer className="blockquote-footer"> <cite title="Source Title"> {source} / {date} </cite>
        //             </footer>
        //             <Button variant="primary"><a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}> go to article</a></Button>
        //             {twitter} {email}
        //         </Card.Body>
        //     </Card>
        // </div>
        <div className="card shadow-lg rounded pb-10" style={{ margin: '2em' }}>
            {/* <img className="card-img-top" src={image} alt="Card image cap" /> */}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <span className="row justify-content-center"><cite title="Source Title"> {source} / {date} </cite></span>
                {email != "" &&
                    <span className="row justify-content-center">email:&nbsp;<a href={`mailto:` + email}>{email}</a></span>
                }
                {twitter != "" &&
                    <span className="row justify-content-center">twitter:&nbsp;<a href={`https://www.twitter.com/` + twitter} target="_blank" rel="noopener noreferrer" >@{twitter}</a></span>
                }

                <Button variant="primary mt-3"><a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}> go to article</a></Button>

            </div>
            <div className="card-footer">
                <small className="text-muted">{author} - {date}</small>
            </div>
        </div>
    );
}

export default Article;