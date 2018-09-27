import React, { Component } from "react";
import CarouselText from "./CarouselText";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      whereInCarousel: 0,
      numberFirstGradient: 100,
      numberSecondGradient: 80,
      numberThirdGradient: 80,
      numberFirstWidth: 100,
      numberSecondWidth: 0,
      numberThirdWidth: 0,
      headerTextOne: "Celine Heldrup", //Celine Heldrup
      paragraphTextOne: "Blog og Ernæring", //Blog og Ernæring
      headerTextTwo: "", //Eteriske Oljer
      paragraphTextTwo: "", //En naturlig kilde til god helse
      colorStyleFirst: "Transparent",
      colorStyleSecond: "Transparent",
      colorStyleThird: "Transparent"
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
    const header = document.querySelector(".background-header-" + this.state.whereInCarousel);
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
        image: "url('https://res.cloudinary.com/doecwsnly/image/upload/v1537711707/CelineHomepagePhoto2.png')",
        widthStyle: widthStyleFirst,
        colorStyle: colorStyleFirst,
        textAppearing: this._textFading,
        textFading: this._textFadingReverse,
        backgroundStyle: "background-0",
      },
      {
        headerText: this.state.headerTextTwo,
        paragraphText: this.state.paragraphTextTwo,
        image: "url('https://res.cloudinary.com/doecwsnly/image/upload/v1537711838/oils-background-image.png')",
        widthStyle: widthStyleSecond,
        colorStyle: colorStyleSecond,
        textAppearing: this._textFading,
        textFading: this._textFadingReverse,
        backgroundStyle: "background-1"
      },
      // {
      //   headerText: this.state.headerTextThree,
      //   paragraphText: this.state.paragraphTextThree,
      //   image: "url('https://res.cloudinary.com/doecwsnly/image/upload/v1537711838/oils-background-image.png')",
      //   widthStyle: widthStyleSecond,
      //   colorStyle: colorStyleSecond,
      //   textAppearing: this._textFading,
      //   textFading: this._textFadingReverse,
      // },
    ];

    let mappedCarouselObject = carouselObject.map((el, index) => {
      return (
        <CarouselText
          key={index}
          headerText={el.headerText}
          paragraphText={el.paragraphText}
          image={el.image}
          widthStyle={el.widthStyle}
          textFadingReverse={el.textFading}
          colorStyle={el.colorStyle}
          backgroundStyle={el.backgroundStyle}
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
      }, 10);
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
      this.setState({
        headerTextOne: "",
        paragraphTextOne: "",
        headerTextTwo: "Eteriske Oljer",
        paragraphTextTwo: "En naturlig kilde til god helse"
      })
      
    }, 2000);
  }

  _boringTextFading(numberWidth, secondWidth) {
    this.setState({
      whereInCarousel: 1,
    })
  }

}

export default Carousel;
