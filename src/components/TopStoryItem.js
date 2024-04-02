import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import config from "../../src/config";

function TopStoryItem() {
  const [topStories, setTopStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = () => {
    setLoading(true);
    const coinBotIds = [22, 23, 24];
    const requests = coinBotIds.map((coinBotId) =>
      fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${coinBotId}&limit=1`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch the latest news for coin bot id ${coinBotId}`);
          }
          return response.json();
        })
        .then((data) => data.articles[0])
        .catch((error) => {
          console.error(`Error fetching the latest news for coin bot id ${coinBotId}:`, error);
          return null;
        })
    );

    Promise.all(requests)
      .then((stories) => {
        setTopStories(stories.filter((story) => story !== null));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % topStories.length);
    }, 5000); // Cambia de historia cada 5 segundos

    return () => clearInterval(interval);
  }, [topStories.length]);

  console.log('topStories', topStories)

  return (
    <div>
      {topStories.length > 0 && (
        <Link
          to={`/article/${topStories[currentStoryIndex].article_id}`}
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <div
            className="topStory-image"
            style={{
              backgroundImage: `url(https://mktnewsposters.s3.us-east-2.amazonaws.com/${topStories[currentStoryIndex].article_id}.jpg)`,
            }}
          >
            {loading ? (
              <p>Loading top story...</p>
            ) : (
              <div className="topStory-details">
                <p className="topStory-description">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ marginRight: "5px", opacity: 0.5 }}
                  />
                  Published {moment(topStories[currentStoryIndex].created_at).format("MM-DD-YYYY")}{" "}
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ marginRight: "5px", opacity: 0.5 }}
                  />
                  {moment(topStories[currentStoryIndex].created_at).format("HH:mm [EST]")}
                </p>
                <h2 className="topStory-title">{topStories[currentStoryIndex].title}</h2>
                <p className="topStory-description">{topStories[currentStoryIndex].description}</p>
              </div>
            )}
          </div>
        </Link>
      )}
    </div>
  );
}

export default TopStoryItem;
