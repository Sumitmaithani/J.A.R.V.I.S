import React, { useState, useEffect } from "react";
import intro from "../../images/intro.mp4";
import "./styles.css";
import useSound from "use-sound";
import sound from "../../images/sound.mp3";
import bg from "../../images/bg1.mp4";


const Homepage = () => {
  const [playSound] = useSound(sound);
  const [showComponent, setShowComponent] = useState(false);

  const [showElement, setShowElement] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(false);
    }, 26000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setShowComponent(true);
    }, 26000);
  }, []);

  return (
    <div>
      {showElement ? (
        <div>
          <video
            id="player-overlay"
            muted
            loop
            autoPlay
            video="100%"
            style={{ width: "100%", height: "100%" }}
          >
            <source src={intro} type="video/mp4" />
          </video>
          <audio src={sound} autoStart autoPlay />
        </div>
      ) : (
        <div></div>
      )}

      {showComponent && (
        <div>
            <video
            id="bg"
            muted
            loop
            autoPlay
            video="100%"
            style={{ width: "100%", height: "100%" }}
          >
            <source src={bg} type="video/mp4" />
          </video>
          <div className="radar">
            <div className="pointer"></div>
            <div className="shadow"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
