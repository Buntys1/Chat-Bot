import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../../Context/Context';

const Main = () => {
  const { onSent, recentPromot, showResult, loading, resultData, setInput, input } = useContext(context);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    if (!loading && resultData) {
      setDisplayedText(''); // Reset displayed text
      typingInterval = setInterval(() => {
        if (currentIndex < resultData.length) {
          setDisplayedText((prev) => prev + resultData[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // Adjust the speed of the typing effect
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [resultData, loading]);

  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {/* Example Cards */}
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>suggest a famous state in india</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
             
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPromot}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: formatBoldText(displayedText) }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="Send Icon"
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
