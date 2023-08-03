import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loading-icons';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article from the API endpoint
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    // Show a loading message while the article is being fetched
    return <div><Circles/></div>;
  }

  return (
    <div>
      <div
        className="article-header"
        style={{
          backgroundImage: `url(${article.top_image ||
            'https://via.placeholder.com/1200x400'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '20em',
          color: 'black',
          fontFamily: "'arial',sans-serif"
        }}
      >
        <h3 style={{marginTop:"0em"}}><Link className='navbar-brand' to='/' style={{fontWeight:'bold'}}> LinguifyHub</Link></h3>
        <h1 style={{textAlign:"center", fontWeight:'bold', marginTop:'100px'}}>{article.title}</h1>
  
        
      </div>
      <div style={{ display: 'flex', alignItems: 'center', maxWidth:'40%' }}>
          <img
            src={article.author_image || 'https://via.placeholder.com/50'}
            alt={article.author}
            style={{ width: '2.5em', height: '2.5em', borderRadius: '50%', marginRight: '10px' }}
          />
          <h6>
            {article.author}
            <br />
            <span style={{fontWeight:"lighter", fontSize:"100"}}>{article.author_description}</span>

          </h6>
          
        </div>
      <p style={{marginTop:"1.5em", color:"#888"}}>Published on: {new Date(article.created_on).toLocaleDateString()}</p>
      <div className="container-sm" style={{ padding: '20px',borderRadius:"10px",boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>
        <p dangerouslySetInnerHTML={{__html:article.content}} />
        
      </div>
      <div style={{textAlign:'center',marginTop:'1.5em'}}>
      <Link to="/blogs">
        <button type="button" className="btn btn-outline-info">View More</button>
      </Link>
      </div>
      <p className="footer-copyright">
          &copy; {new Date().getFullYear()} LinguifyHub. All rights reserved.
        </p>
    </div>
  );
};

export default Article;
