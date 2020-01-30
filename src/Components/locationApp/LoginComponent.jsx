import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'flo',
            password: 'flo',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        
    }

    handlerChange = (event) =>{
        console.log(this.state)
        this.setState({
            [event.target.name]
            :event.target.value
        })
    }

    loginClick = () => {
        // flo,flo
        
        AuthenticationService
        .executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(
            () => {
                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
                this.props.history.push(`/welcome/${this.state.username}`)
            }
        ).catch(() => {
            this.setState({hasLoginFailed: true})
            this.setState({showSuccessMessage: false})
        })
    }

    render() {
        return (
            <div>
            <h1>Login</h1>
            <div className="container">
                {this.state.showSuccessMessage && <div>Login Successfull</div>}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalide Credentials</div>}
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handlerChange} />
                Passwort: <input type="password" name="password" value={this.state.password} onChange={this.handlerChange}/>
                <button onClick={this.loginClick} className="btn btn-success">Login</button>
            </div>
            </div>
        )
    }
}
export default LoginComponent;