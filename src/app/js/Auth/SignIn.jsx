import React from 'react'
import { Link } from 'react-router-dom'

class SignIn extends React.Component {
    componentDidMount() {
        this.props.handleInputChange('email', '')
        this.props.handleInputChange('password', '')
    }

    render() {
        return (
            <div className="signin-container">
            <div className="small-signin-container">
                <h1 className="header-signin">Innlogging</h1>
                <input
                    type="email"
                    value={this.props.email}
                    onChange={evt => this.props.handleInputChange('email', evt.target.value)}
                    className="input"
                    placeholder="E-Post"
                />
                <br />
                <br />
                <input
                    type="password"
                    value={this.props.password}
                    onChange={evt => this.props.handleInputChange('password', evt.target.value)}
                    className="input"
                    placeholder="Passord"
                />
                <br />
                <br />
                <button className="button-signin" onClick={() => this.props.sign('in')}>
                    Logg på
                </button>
                <br />
                <br />
                <p>{this.props.error}</p>
                <div className="separator" />
                <div className="signin-link">
                <Link className="link" to="/auth/sign-up">
                    Har du ingen bruker? Registrer deg nå!
                </Link>
                </div>
            </div>
            </div>
        )
    }
}

export default SignIn
