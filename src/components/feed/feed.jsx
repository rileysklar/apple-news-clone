import React, { useState, useEffect } from "react";
import "./feed.css";

const calculateTimeAgo = (publishedAt) => {
  // Convert publishedAt to a Date object
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  // Calculate the difference in milliseconds
  const diffMillis = now.getTime() - publishedDate.getTime();
  // Convert milliseconds to days, hours, and minutes
  const diffDays = diffMillis / (1000 * 60 * 60 * 24);
  const diffHours = diffMillis / (1000 * 60 * 60);
  const diffMinutes = diffMillis / (1000 * 60);

  // Return the time ago in days, hours, or minutes
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
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    const fetchNews = async () => {
      // Placeholder for your new API key
      const apiKey = "pub_38803c45c8b704cdd8a50f6b84d2723752bb8";
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&q=politics`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "success") {
          // Adjust to use the results array and check for non-null image_url
          const articlesWithImages = data.results.filter(
            (article) => article.image_url
          );
          setArticles(articlesWithImages);
          console.log(articles.length);
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
    setVisible((prevVisible) => prevVisible + 5);
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
                  <img src={article.image_url} alt={article.title} />
                </div>
                <div className="card-content">
                  <h4 className="eyebrow">
                    {article.creator ?? "Source Unknown"}
                  </h4>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more-btn"
                  >
                    Read more
                  </a>
                  <div className="meta-info">
                    {calculateTimeAgo(article.pubDate)} |{" "}
                    {article.creator?.join(", ") || "Unknown Author"}
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
