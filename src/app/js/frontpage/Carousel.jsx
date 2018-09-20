import React, { Component } from "react";
import CarouselText from "./CarouselText";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberFirstGradient: 100,
      numberSecondGradient: 80,
      numberFirstWidth: 100,
      numberSecondWidth: 0,
      headerTextOne: "Celine Heldrup", //Celine Heldrup
      paragraphTextOne: "Blog og Ernæring", //Blog og Ernæring
      headerTextTwo: "", //Eteriske Oljer
      paragraphTextTwo: "", //En naturlig kilde til god helse
      colorStyleFirst: "Transparent",
      colorStyleSecond: "Transparent"
    };

    this.fadingContinue = true;

    this._textFading = this._textFading.bind(this);
    this._textFadingTwo = this._textFadingTwo.bind(this);
    this._textFadingReverse = this._textFadingReverse.bind(this);
  }

  componentDidMount() {
    this._textFading();
  }

  componentDidUpdate(newProps, newState) {
    const header = document.querySelector(".background-header-0");
    const bgString = `linear-gradient(to left, rgba(255, 0, 0, 0) ${
      newState.numberFirstGradient
    }%, rgb(235, 235, 235) ${newState.numberSecondGradient}%)`;

    header.style.background = bgString;
    header.style.backgroundClip = "text";
    header.style.webkitBackgroundClip = "text";
  }

  render() {
    let widthStyleFirst = {
      width: this.state.numberFirstWidth + "%"
    };
    let widthStyleSecond = {
      width: this.state.numberSecondWidth + "%"
    };
    let colorStyleFirst = {
      color: this.state.colorStyleFirst
    };
    let colorStyleSecond = {
      color: this.state.colorStyleSecond
    };

    const carouselObject = [
      {
        headerText: this.state.headerTextOne,
        paragraphText: this.state.paragraphTextOne,
        image: "url('CelineHomepagePhoto2.4da96596.png')",
        widthStyle: widthStyleFirst,
        colorStyle: colorStyleFirst
      },
      {
        headerText: this.state.headerTextTwo,
        paragraphText: this.state.paragraphTextTwo,
        image: "url('oils-background-image.45e1b2d7.png')",
        widthStyle: widthStyleSecond,
        colorStyle: colorStyleSecond
      }
    ];

    let mappedCarouselObject = carouselObject.map((el, index) => {
      return (
        <CarouselText
          key={index}
          headerText={el.headerText}
          paragraphText={el.paragraphText}
          image={el.image}
          widthStyle={el.widthStyle}
          textFadingReverse={this._textFadingReverse}
          colorStyle={el.colorStyle}
        />
      );
    });
    return <div id="carousel-container">{mappedCarouselObject}</div>;
  }

  _textFading() {
    if (!this.fadingContinue) return;
    if (this.state.numberFirstGradient > 0) {
      this.state.numberFirstGradient--;
      let newNumberFirstGradient = this.state.numberFirstGradient;
      setTimeout(() => {
        this.setState({
          numberFirstGradient: newNumberFirstGradient,
          colorStyleFirst: "rgb(235, 235, 235)"
        });
        return this._textFading();
      }, 15);
    } else {
      return this._textFadingTwo();
    }
  }

  _textFadingTwo() {
    if (!this.fadingContinue) return;
    if (this.state.numberSecondGradient > 0) {
      this.state.numberSecondGradient--;
      let newNumberSecondGradient = this.state.numberSecondGradient;
      setTimeout(() => {
        this.setState({
          numberSecondGradient: newNumberSecondGradient
        });
        return this._textFadingTwo();
      }, 15);
    } else {
      return;
    }
  }

  _textFadingReverse() {
    this.fadingContinue = false;
    this.state.numberSecondGradient = 80;
    if (this.state.numberFirstGradient < 99) {
      this.state.numberFirstGradient++;
      let newNumberFirstGradient = this.state.numberFirstGradient;
      setTimeout(() => {
        this.setState({
          numberFirstGradient: newNumberFirstGradient,
          colorStyleFirst: "transparent"
        });
        return this._textFadingReverse();
      }, 15);
    } else {
      this.state.numberSecondGradient = 80;
      return this._carousel();
    }
  }

  _carousel() {
    this.setState({
      numberFirstWidth: 0,
      numberSecondWidth: 100
    });
    setTimeout(() => {
      if (!this.fadingContinue) return;
        
    }, 2000);
  }

}

export default Carousel;
