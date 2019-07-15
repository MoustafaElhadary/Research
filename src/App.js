import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import './App.css';
import NewsAPI from 'newsapi';
import Article from './Article';


function App() {

  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY || "REACT_APP_NEWS_API_KEY");

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('WeWork');

  useEffect(() => {
    getNews();
  },[query]);

  const getNews = () => {
    newsapi.v2.everything({
      q: query,
      sortBy: 'relevancy',
      pageSize:50,
      page:1
    }).then(response => {
      setArticles(response.articles);
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
    <h1> Welcome to the Company Article Knowledge Base! </h1>
    <h4> Search below for any comapny and get articles on them </h4>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" value={search} onChange={updateSearch} />
        <Button className="search-button" type="submit" >Search</Button>
      </form>
      <div className="row justify-content-center"> 

        {articles.map(article => (
        <Article 
          key={article.title}
          title={article.title}
          author={article.author}
          content={article.content}
          image={article.urlToImage}
          source={article.source.name}
          url={article.url}
        />
      ))}
      </div>
        
      
    </div>
  );
}

export default App;
