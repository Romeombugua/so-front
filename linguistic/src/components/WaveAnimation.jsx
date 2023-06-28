import React, { useEffect } from 'react';

const WaveAnimation = () => {
  useEffect(() => {
    const mainPath = document.querySelector("#main");
    const secondPath = document.querySelector("#secondary");
    let horizontalPoints = [];
    for (let i = 0; i < 600; i++) {
      horizontalPoints.push([i, 70 * Math.cos(i / 200)]);

      // Try dividing i in the sin function by a constant
      // Try switching the trig function associated with the y point
      // Todo: make this in a circle
    }

    let offset = 0;
    let offset2 = 5.3;

    const animate = () => {
      let random = Math.random();
      requestAnimationFrame(animate);

      let path1 = "M" + horizontalPoints.map(point => {
        const y = 30 + 25 * Math.sin((point[1] + offset) / 10);
        return point[0] + "," + y;
      }).join(" L");

      let path2 = "M" + horizontalPoints.map(point => {
        const y = 30 + 25 * Math.sin((point[1] + offset + offset2) / 10);
        return point[0] + "," + y;
      }).join(" L");

      mainPath.setAttribute("d", path1);
      secondPath.setAttribute("d", path2);

      offset += 0.75;
      console.log(offset);
    };

    animate();
  }, []);

  return (
    <div className="wave-box">
      <svg>
        <path id="main"></path>
        <path id="secondary"></path>
      </svg>
    </div>
  );
};

export default WaveAnimation;
