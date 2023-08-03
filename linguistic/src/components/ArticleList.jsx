import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loading-icons';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch the articles from the API endpoint
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  if (!articles) {
    // Show a loading message while the article is being fetched
    return <div><Circles/></div>;
  }

  return (
    <div className="container">
      <h3><Link className='navbar-brand' to='/' style={{fontWeight:'bold'}}> LinguifyHub</Link></h3>
      <h5 style={{textAlign:'center', marginTop:'1em', marginBottom:'1em'}}>Latest Posts</h5>
      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-md-6 mb-4" style={{fontFamily:"'Arial, sans-serif"}}>
            <div className="card" style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"}}>
              <img
                src={article.top_image || 'https://via.placeholder.com/300'}
                className="card-img-top"
                alt={article.title}
                style={{height:'15em', objectFit:"cover"}}
              />
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:'center'}}><Link to={`/blogs/${article.id}`} >{article.title}</Link></h5>
                <p className="card-text mt-3 mb-3" style={{textAlign:"center",color:"#888"}}>{new Date(article.created_on).toLocaleString()}</p>
                <p className="card-text" dangerouslySetInnerHTML={{__html:article.content.substring(0, 100)}} />
              </div>
            </div>
          </div>
        ))}
      </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} LinguifyHub. All rights reserved.
        </p>
    </div>
  );
};

export default ArticleList;
