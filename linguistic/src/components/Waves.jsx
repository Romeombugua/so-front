import React, { useEffect } from 'react';

const Waves = () => {
  useEffect(() => {
    const typedText = document.querySelectorAll('.typed-text');
    const texts = Array.from(typedText).map((element) => element.textContent);

    const helloWorldText = texts[0];
    const transcribeText = texts[1];
    const translateText = texts[2];

    typedText.forEach((element) => {
      element.textContent = '';
    });

    const typeText = (text, element, callback) => {
      const characters = text.split('');
      const delay = 100;
      characters.forEach((char, charIndex) => {
        setTimeout(() => {
          element.textContent += char;
          if (charIndex === characters.length - 1 && typeof callback === 'function') {
            callback();
          }
        }, charIndex * delay);
      });
    };

    typeText(helloWorldText, typedText[0], () => {
      typeText(transcribeText, typedText[1]);
      setTimeout(() => {
        typeText(translateText, typedText[2]);
      }, transcribeText.length * 100);
    });
  }, []);

  return (
    <div className="header">
      {/* Content before waves */}
      <div className="inner-header flex">
        {/* Just the logo.. Don't mind this */}
        <br />
        <div className="typed-container">
          <span className="typed-text">Hello, world! Lets start building from here!</span>
          <div className="sub-text">
            <span className="typed-text" id="transcribe">transcribe</span> |
            <span className="typed-text" id="translate">translate</span>
          </div>
        </div>
      </div>
      {/* Waves Container */}
      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      {/* Waves end */}
      {/* Content starts */}
      <div className="content flex">

      </div>
      {/* Content ends */}
    </div>
  );
};

export default Waves;
