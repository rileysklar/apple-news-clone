import React, { useState, useEffect } from "react";
import "./feed.css";

const calculateTimeAgo = (publishedAt) => {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diffMillis = now - publishedDate;
  const diffDays = diffMillis / (1000 * 60 * 60 * 24);
  const diffHours = diffMillis / (1000 * 60 * 60);
  const diffMinutes = diffMillis / (1000 * 60);

  if (diffDays >= 1) {
    return `${Math.round(diffDays)} days ago`;
  } else if (diffHours < 24 && diffHours >= 1) {
    return `${Math.round(diffHours)} hours ago`;
  } else {
    return `${Math.round(diffMinutes)} minutes ago`;
  }
};

const Feed = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const url = `https://newsapi.org/v2/everything?sortBy=publishedAt&q="politics"&language=en&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "ok") {
          const articlesWithImages = data.articles.filter(
            (article) => article.urlToImage
          );
          setArticles(articlesWithImages);
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const loadMore = () => {
    setVisible((prevVisible) => prevVisible + 12);
  };

  return (
    <>
      <div className="scrollable-container">
        <div className="main-container">
          <h2 className="top-stories">Top Stories</h2>
        </div>
        <div className="articles-list">
          {articles.slice(0, visible).map((article, index) => (
            <div className="article-item" key={index}>
              <div className="card">
                <div className="image-container">
                  <img src={article.urlToImage} alt={article.title} />
                </div>
                <div className="card-content">
                  <h4 className="eyebrow">{article.source.name}</h4>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more-btn"
                  >
                    Read more
                  </a>
                  <div className="meta-info">
                    {calculateTimeAgo(article.publishedAt)} | {article.author}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visible < articles.length && (
          <div className="load-more-container">
            <button onClick={loadMore} className="load-more-btn">
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Feed;
