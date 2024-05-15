import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }
  
  //Decrements currCardIdx state by 1
  function goBackward() {
    setCurrCardIdx(currCardIdx - 1);
  }

  // Determine visibility of left arrow
  const showLeftArrow = currCardIdx !== 0;

// Determine visibility of right arrow
const showRightArrow = currCardIdx !== photos.length - 1;


  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        { showLeftArrow &&
        <button
        className="bi bi-arrow-left-circle"
        onClick={goBackward}
        >⬅️</button>
        }
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        { showRightArrow &&
        <button
          className="bi bi-arrow-right-circle"
          onClick={goForward}
        >➡️</button>
        }
      </div>
    </div>
  );
}

export default Carousel;
