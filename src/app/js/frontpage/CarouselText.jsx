import React from "react";

const CarouselText = props => {
    let backgroundImageFirst = {
        backgroundImage: props.image
      }

  return (
    <div className="background-0" style={Object.assign(props.widthStyle, backgroundImageFirst)}>
      <div className="background-overlay-image">
        <div id="text-box-0" className="text-box">
          <h1 className="background-header-0">{props.headerText}</h1>
          <p className="background-paragraph-0" style={props.colorStyle}>{props.paragraphText}</p>
        </div>
      </div>
      <button
        className="next-image-carousel button"
        onClick={() => props.textFadingReverse()}
      >
        >
      </button>
      <button className="previous-image-carousel button">&lt;</button>
    </div>
  );
};

export default CarouselText;
