import React, { Component } from 'react';
import api from "../utils/api";

class Checkout extends Component {
    render() {
        return (
            <div>
                <div className="navigation-fix"></div>
                <button onClick={this._submitData}>Check out</button>
            </div>
        );
    }

    _submitData() {
        api.get("/api/check-out").then((result) => {
            console.log(result)
        })
    }
}

export default Checkout;