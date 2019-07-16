import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import NewsAPI from 'newsapi';
import Snovio from 'snovio';
import Article from './Article';
import logo from './Logo.png';
import extractDomain from 'extract-domain';
import jsonResponse from './DB/Db';


function App() {

  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY || "REACT_APP_NEWS_API_KEY");
  const snovio = Snovio(process.env.REACT_APP_SNOVIO_UID || "REACT_APP_SNOVIO_UID", process.env.REACT_APP_SNOVIO_SECRET || "REACT_APP_SNOVIO_SECRET");

  const human = require('humanparser');
  const contacts = [...jsonResponse];

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('WeWork');

  useEffect(() => {
    getNews();
  }, [query]);

  const getNews = () => {
    newsapi.v2.everything({
      q: query,
      sortBy: 'relevancy',
      language:'en',
      pageSize: 100,
    }).then(response => {

      var articles = response.articles.filter(article => article.title.toLowerCase().includes("wework") && article.author != null).map(function (article) {

        const parsed = human.parseName(article.author != null ? article.author : '');
        const domain = extractDomain(article.url);
        const contact = contacts.find(contact => article.author.includes(contact.Name));

        return {
          ...article,
          "paper": article.source.name,
          "domain": domain,
          "firstName": parsed.firstName,
          "lastName": parsed.lastName,
          "email": contact != null ? contact.Email : "",
          "twitter": contact != null ? contact.Twitter : ""
        }
      });
      console.log(articles);
      setArticles(articles);
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
      <div class=" sticky-top bg-white pb-3 pt-3">
         <img src={logo} height="50" className="justify-content-left" ></img>
      </div>
     
      <h1> Company Article Knowledge Base</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar shadow-lg rounded" value={search} onChange={updateSearch} />
        <Button className="search-button rounded" type="submit" >Search</Button>
      </form>

      <div class="container">
        <div class="row">
          <div>
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
      </div>
    </div>
  );
}

export default App;
