import React, { useState, useEffect } from "react";
import NewsItemXs from "./NewsItemXs";
import config from "../config";
import MoreNews from "./MoreNews";

function Aside() {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch additional news from the API endpoint for each coin bot id
    const coinBotIds = [22, 23, 24];
    coinBotIds.forEach((coinBotId) => {
      fetchNews(coinBotId);
    });
  }, []);

  const fetchNews = (coinBotId) => {
    // Fetch additional news from the API endpoint for the specified coin bot id
    fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${coinBotId}&limit=3`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch latest news for coin bot id ${coinBotId}`);
        }
        return response.json();
      })
      .then((data) => {
        // Concatenate the new articles with the existing ones
        setLatestNews((prevNews) => {
          const combinedNews = prevNews.concat(data.articles);
          return shuffleArray(combinedNews);
        });
      })
      .catch((error) => {
        console.error(`Error fetching latest news for coin bot id ${coinBotId}:`, error);
      })
      .finally(() => {
        // After all fetches are done, set loading to false
        setLoading(false);
      });
  };

  // Función para mezclar aleatoriamente un array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <aside>
      <div className="aside-content">
        <div
          style={{
            display: "flex",
            height: "28px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Most Recent</h2>
        </div>
        <hr />
        {loading ? (
          <div className="dots-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : latestNews.length === 0 ? (
          <p>No news available</p>
        ) : (
          <div className="ad">
            {latestNews.slice(6, 9).map((item) => (
              <NewsItemXs
                key={item.article_id}
                articleId={item.article_id}
                publishedTime={item.created_at}
                title={item.title}
              />
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{
              margin: "10px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            AD AI ALPHA
          </span>
        </div>
        <br />
        <MoreNews />
      </div>
    </aside>
  );
}

export default Aside;
