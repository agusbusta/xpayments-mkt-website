import React from "react";
import ethereum from "../assets/ethereum.png";
import bitcoin from "../assets/bitcoin.png";
import layer0 from "../assets/layer0.png";

function MoreNews() {
  return (
    <>
      <br />
      <div className="aside-content">
        <h2>More News</h2>
        <hr />
        <br />
        <ul className="website-list">
          <div className="website-group">
            <li className="website-li">
              <a href="https://eth-mkt-webiste.vercel.app">
                <img
                  src={ethereum}
                  className="otherwebsiteimg"
                  alt="Ethereum"
                />
                <p className="textCardMoreWebsites">Ethereum</p>
              </a>
            </li>
            <li className="website-li">
              <a href="https://btc-mkt-website.vercel.app">
                <img src={bitcoin} className="otherwebsiteimg" alt="Bitcoin" />
                <p className="textCardMoreWebsites"> Bitcoin</p>
              </a>
            </li>
          </div>
          <div className="website-entire">
            <li className="website-li layer1div">
              <a href="https://layer0-mkt-website.vercel.app">
                <img src={layer0} className="layer1logo" alt="Layer 1 (LMC)" />
                <p className="textCardMoreWebsites">Layer 0</p>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default MoreNews;
