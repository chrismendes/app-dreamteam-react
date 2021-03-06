import React, { useState } from 'react';
import './SlideShow.scss';

const SlideShow = (props) => {

  const slides = props.slides;
  const buttonLabel = (props.button) ? props.button : 'Next Slide';
  const updateAppState = props.update;
  const defaultSlide = (props.active) ? props.active : 0;
  const [activeSlide, setActiveSlide] = useState(defaultSlide);

  const changeSlide = () => {
    let nextSlide = activeSlide + 1;
    if (activeSlide >= slides.length-1) nextSlide = 0;
    setActiveSlide(nextSlide);
    if(updateAppState) updateAppState(slides[nextSlide]);
  };

  const slideImagesListItems = slides.map((n, i) =>
    <li className={i === activeSlide ? 'is-active': '' } key={n.id}>
      <img src={n.image} alt={n.title} width="300" height="375" />
    </li>
  );

  const slideImages = (
    <ul className="slideshow__images">
      {slideImagesListItems}
    </ul>
  );

  const dots = () => {
    return Array.from(Array(slides.length), (_, i) => 
      <li className={i === activeSlide ? 'is-active': '' } key={i}>
        <span className="slideshow__dotoff material-icons">radio_button_unchecked</span>
        <span className="slideshow__doton material-icons">check_circle</span>
      </li>
    );
  };


  return (
    <div className="slideshow" data-testid="SlideShow">
      {slideImages}
      <div className="slideshow__controls">
        <span className="slideshow__title">{slides[activeSlide].title}</span>
        <button onClick={changeSlide} className="slideshow__button">{buttonLabel}</button>
        <ul className="slideshow__dots">
          {dots()}
        </ul>
      </div>
    </div>
  );

};

export default SlideShow;
