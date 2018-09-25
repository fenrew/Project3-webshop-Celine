import React from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import Auth from './Auth'
import Navigation from './Navigation'
import Profile from './Profile'
import NotFound from './NotFound'
import api from './utils/api'
import Frontpage from "./frontpage/frontpage"
import Shop from "./shop/Shop"
import Checkout from "./shop/Checkout"
import AboutMe from "./about/aboutMe"
import Blog from "./blog/blog"
import Settings from "./settings/settings"

class Application extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this._setUser(true),
            login: "Logg på"
        }

        this._setUser = this._setUser.bind(this)
        this._resetUser = this._resetUser.bind(this)
    }

    componentDidMount() {
        this._setUser()
    }

    render() {
        return (
            
            <BrowserRouter>
                <div>
                    <Navigation user={this.state.user} login={this.state.login} />
                    <Switch>
                        <Route exact path="/" render={() => <Frontpage user={this.state.user} />} />
                        <Route exact path="/shop" render={() => <Shop user={this.state.user} />} />
                        <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
                        <Route exact path="/shop/checkout" render={() => <Checkout user={this.state.user} />} />
                        <Route exact path="/about-me" render={() => <AboutMe user={this.state.user} />} />
                        <Route exact path="/blog" render={() => <Blog user={this.state.user} />} />
                        <Route exact path="/settings" render={() => <Settings user={this.state.user} />} />
                        <Route
                            path="/auth"
                            render={() => <Auth setUser={this._setUser} resetUser={this._resetUser} />}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        
        )
    }

    _resetUser() {
        this.setState({
            user: null,
            login: "Logg på"
        })
    }

    _setUser(init) {
        const token = localStorage.getItem('identity')
        if (token) {
            const decoded = jwtDecode(token)
            delete decoded.iat
            if (init) return decoded
            this.setState({ user: decoded, login: "Logg av" })
        } else {
            return null
        }
    }
}

export default Application