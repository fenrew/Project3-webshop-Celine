import React from 'react'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {
    componentDidMount() {
        this.props.handleInputChange('email', '')
        this.props.handleInputChange('password', '')
    }

    render() {
        return (
            <div className="signin-container">
            <div className="small-signup-container">
                <h1 className="header-signin">Registrer deg</h1>
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
                <input
                    type="file"
                    value={this.props.picture}
                    onChange={evt => this.props.handleInputChange('picture', evt.target.files[0])}
                    className="input"
                    placeholder="Profil bilde"
                />
                <br />
                <br />
                <button className="button-signin" onClick={() => this.props.sign('up')}>
                    Registrer
                </button>
                <br />
                <br />
                <p>{this.props.error}</p>
                <div className="separator" />
                <div className="signin-link">
                    <Link className="link" to="/auth/sign-in">
                        Har du en bruker allerede? Logg inn!
                    </Link>
                </div>
            </div>
            </div>
        )
    }
}

export default SignUp
