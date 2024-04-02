import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsSection from "./components/NewsSection";
import Aside from "./components/Aside";
import "./App.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleDetail from "./components/ArticleDetail";
import TopStoryItem from "./components/TopStoryItem";

function App() {
  const [additionalNews, setAdditionalNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const coinBotIds = [22, 23, 24];
    coinBotIds.forEach((coinBotId) => {
      fetchNews(coinBotId);
    });
  }, []);

  const fetchNews = (coinBotId) => {
    // Fetch additional news from the API endpoint for the specified coin bot id
    fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${coinBotId}&limit=6`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch additional news for coin bot id ${coinBotId}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Additional news for coin bot id ${coinBotId} stored:`, data.articles);
        // Concatenate the new articles with the existing ones randomly
        setAdditionalNews((prevNews) => {
          const combinedNews = prevNews.concat(data.articles);
          return shuffleArray(combinedNews);
        });
      })
      .catch((error) => {
        console.error(`Error fetching additional news for coin bot id ${coinBotId}:`, error);
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
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="news-sections">
                    <h2>Top Stories</h2>
                    <hr />
                    <TopStoryItem />
                    {loading ? (
                      <div className="dots-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <NewsSection
                        sectionTitle="Additional News"
                        news={additionalNews.slice(8)}
                      />
                    )}
                  </section>
                  <Aside />
                </>
              }
            />
            <Route path="/article/:articleId" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
