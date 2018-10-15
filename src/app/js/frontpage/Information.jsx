import React, { Component } from "react";
import { Redirect } from "react-router";

class Information extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutMe: false,
      etericOils: false,
      grunder: false
    };

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    if (this.state.aboutMe) {
      return <Redirect push to="/about-me" />;
    }

    if (this.state.etericOils) {
      return <Redirect push to="/doterra" />;
    }

    return (
      <div>
        <div className="image-information-flexbox">
          <div id="image-information-one" className="each-image-information">
            <div
              className="each-image-information-text"
              onClick={() => this._handleClick(0)}
            >
              Om meg
            </div>
          </div>
          <div id="image-information-two" className="each-image-information">
            <div className="each-image-information-text" onClick={() => this._handleClick(1)}>Eteriske oljer</div>
          </div>
          <div id="image-information-three" className="each-image-information">
            <div className="each-image-information-text" onClick={() => this._handleClick(2)}>Gründeren i deg!</div>
          </div>
        </div>
      </div>
    );
  }

  _handleClick(number) {
    if (number === 0) {
      this.setState({
        aboutMe: true
      });
    } else if (number === 1) {
      this.setState({
        etericOils: true
      });
    } else if (number === 2) {
      this.setState({
        grunder: true
      });
    }
  }
}

export default Information;
