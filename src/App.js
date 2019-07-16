import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import NewsAPI from 'newsapi';
import Snovio from 'snovio';
import Article from './Article';
import logo from './Logo.png';
// import extractDomain from 'extract-domain';
import jsonResponse from './DB/Db';


function App() {

  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY || "REACT_APP_NEWS_API_KEY");
  const WEWORK = "wework";

  // const snovio = Snovio(process.env.REACT_APP_SNOVIO_UID || "REACT_APP_SNOVIO_UID", process.env.REACT_APP_SNOVIO_SECRET || "REACT_APP_SNOVIO_SECRET");
  // const human = require('humanparser');

  const contacts = [...jsonResponse];

  const emails = contacts.map(contact => contact.Email).join("; ");

  //DEclaring states and intializing them
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(WEWORK);

  useEffect(() => {
    getNews();
  }, [query]);

  const getNews = () => {
    newsapi.v2.everything({
      q: query,
      sortBy: 'relevancy',
      language: 'en',
      pageSize: 100,
    }).then(response => {

      var articles = response.articles.filter(article => article.author != null && article.title.toLowerCase().includes(query)).map(function (article) {
        //TODO: This will be implemented later when searching by author is implemented
        // const parsed = human.parseName(article.author != null ? article.author : '');
        // const domain = extractDomain(article.url);

        const contact = contacts.find(contact => article.author.includes(contact.Name));
        console.log(contact);
        return {
          ...article,
          "paper": article.source.name,
          // "domain": domain,
          // "firstName": parsed.firstName,
          // "lastName": parsed.lastName,
          "email": contact != null ? contact.Email : "",
          "twitter": contact != null ? contact.Twitter : ""
        }
      });
      console.log(articles);
      setArticles(articles);
      setTotal([response.totalResults, contacts.length]);
    });
  }


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }


  return (
    <div className="App">
      <div className="container sticky-top">
        <div className="row bg-white pb-10 pt-10">
          <div className="col-6 ">
            <img src={logo} height="20" className="App-img img-fluid" />
          </div>
          <div className="col justify-content-right app-txt">
            <div className="row  pt-10">
              <span>{total[0]} articles on {query}</span>
            </div>
            <div className="row">
              <span>{total[1] * 2} emails for authors that wrote about {query}</span>
            </div>
          </div>
        </div>
      </div>


      <span style={{ fontSize: "3vw" }}> Company Article Knowledge Base</span>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar shadow-lg rounded" value={search} onChange={updateSearch} />
        <Button className="search-button rounded" type="submit" >Search</Button>
        <Button className="search-button ml-6 rounded" ><a href={`mailto:` + emails} style={{ textDecoration: 'none', color: 'white' }}>Mass Email</a></Button>
      </form>

      {/* <div className="container">
        <div>
          <div className="container">
            
          </div>
        </div>
      </div> */}
      <div className="card-deck">
        {articles.map(article => (
          <Article
            title={article.title}
            author={article.author}
            content={article.description}
            image={article.urlToImage}
            source={article.source.name}
            url={article.url}
            publishedAt={article.publishedAt}
            email={article.email}
            twitter={article.twitter}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
