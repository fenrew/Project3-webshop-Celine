import React, { Component } from "react";
import ReactDOM from "react-dom";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberFirstGradient: 100,
      numberSecondGradient: 80,

      widthOne: "100%",
      widthTwo: "0%",
      widthThree: "0%",
      widthFour: "0%",
      headerOne: "Celine Heldrup",
      headerTwo: "",
      headerThree: "",
      headerFour: "",
      fadingClassOne: "background-header",
      fadingClassTwo: "",
      fadingClassThree: "",
      fadingClassFour: "",
      wordSizeOne: "8vw",
      wordSizeTwo: "8vw",
      wordSizeThree: "8vw",
      wordSizeFour: "8vw"
    };
    this.fadingContinue = true;
    this.slideContinue = true;
    this.myRef = React.createRef();

    this._newSlide = this._newSlide.bind(this);
    this._textFading = this._textFading.bind(this);
    this._textFadingTwo = this._textFadingTwo.bind(this);
    this.scrollToDomRef = this.scrollToDomRef.bind(this);
  }

  componentDidMount() {
    this._textFading();
  }

  componentDidUpdate(newProps, newState) {
    const header = document.querySelector(".background-header");
    const bgString = `linear-gradient(to left, rgba(255, 0, 0, 0) ${
      newState.numberFirstGradient
    }%, rgb(235, 235, 235) ${newState.numberSecondGradient}%)`;

    header.style.background = bgString;
    header.style.backgroundClip = "text";
    header.style.webkitBackgroundClip = "text";
  }

  render() {
    let widthOne = {
      width: this.state.widthOne
    };
    let widthTwo = {
      width: this.state.widthTwo
    };
    let widthThree = {
      width: this.state.widthThree
    };
    let widthFour = {
      width: this.state.widthFour
    };
    let fontOne = {
      fontSize: this.state.wordSizeOne
    };
    let fontTwo = {
      fontSize: this.state.wordSizeTwo
    };
    let fontThree = {
      fontSize: this.state.wordSizeThree
    };
    let fontFour = {
      fontSize: this.state.wordSizeFour
    };

    return (
      <div>
        <div id="flex">
          <div
            id="background-0"
            style={widthOne}
            onClick={() =>
              this._newSlide(
                "widthOne",
                "widthTwo",
                "headerOne",
                "headerTwo",
                "doTERRA oljer",
                "fadingClassOne",
                "fadingClassTwo",
                "wordSizeOne",
                "wordSizeTwo"
              )
            }
          >
            <div className="background-overlay-image">
              <h1 className={this.state.fadingClassOne} style={fontOne}>
                {this.state.headerOne}
              </h1>
            </div>
          </div>
          <div
            id="background-1"
            style={widthTwo}
            onClick={() =>
              this._newSlide(
                "widthTwo",
                "widthThree",
                "headerTwo",
                "headerThree",
                "Kosthold og Ernæring",
                "fadingClassTwo",
                "fadingClassThree",
                "wordSizeTwo",
                "wordSizeThree"
              )
            }
          >
            <div className="background-overlay-image">
              <div className="nagivation-fix" />
              <h1 className={this.state.fadingClassTwo} style={fontTwo}>
                {this.state.headerTwo}
              </h1>
            </div>
          </div>
          <div
            id="background-2"
            style={widthThree}
            onClick={() =>
              this._newSlide(
                "widthThree",
                "widthFour",
                "headerThree",
                "headerFour",
                "Created by Markus Heldrup",
                "fadingClassThree",
                "fadingClassFour",
                "wordSizeThree",
                "wordSizeFour"
              )
            }
          >
            <div className="background-overlay-image">
              <div className="nagivation-fix" />
              <h1 className={this.state.fadingClassThree} style={fontThree}>
                {this.state.headerThree}
              </h1>
            </div>
          </div>
          <div
            id="background-3"
            style={widthFour}
            onClick={() =>
              this._newSlide(
                "widthFour",
                "widthOne",
                "headerFour",
                "headerOne",
                "Celine Heldrup",
                "fadingClassFour",
                "fadingClassOne",
                "wordSizeFour",
                "wordSizeOne"
              )
            }
          >
            <div className="background-overlay-image">
              <div className="nagivation-fix" />
              <h1 className={this.state.fadingClassFour} style={fontFour}>
                {this.state.headerFour}
              </h1>
            </div>
          </div>
        </div>
        <div className="carousel-more-button" ref={this.myRef} onClick={() => this.scrollToDomRef()}>
          Mer <br />
          <div className="carousel-arrow">{">"}</div>
        </div>
      </div>
    );
  }

  _newSlide(
    self,
    key,
    headSelf,
    headKey,
    headValue,
    fadeingSelf,
    fadingKey,
    fontSelf,
    fontKey
  ) {
    if (!this.slideContinue) return;
    this.slideContinue = false;
    this.setState({
      [self]: "0%",
      [key]: "100%",
      [fontSelf]: "0vw",
      [fontKey]: "8vw"
    });
    setTimeout(() => {
      this.setState({
        [headSelf]: "",
        numberFirstGradient: 100,
        numberSecondGradient: 80,
        [fadingKey]: "background-header",
        [fadeingSelf]: ""
      });
    }, 1800);
    setTimeout(() => {
      this.setState({
        [headKey]: headValue
      });
      this.slideContinue = true;
      return this._textFading();
    }, 2000);
  }

  _textFading() {
    // console.log(this.state.numberFirstGradient)
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

  scrollToDomRef = () => {
    console.log(this.myRef.current);
    const myDomNode = ReactDOM.findDOMNode(this.myRef.current);
    myDomNode.scrollIntoView();
  };
}

export default Carousel;
