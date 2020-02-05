import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import {withRouter} from 'react-router';

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)
        return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-brand logo" to="/"></div>
                <ul className="navbar-nav">
                    {isUserLoggedIn && <li className="nav-link"><Link className="text-white" to="/welcome/in28minutes">Home</Link></li>}
                    {isUserLoggedIn && <li className="nav-link"><Link className="text-white" to="/locations">Locations</Link></li>}                   
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn && <li className="nav-link"><Link className="text-white" to="/register">Registrieren</Link></li>} 
                    {!isUserLoggedIn && <li className="nav-link"><Link className="text-white" to="/login">Login</Link></li>}
                    {isUserLoggedIn && <li className="nav-link"><Link className="text-white" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
            </nav>
            <br/>
        </header>
        
        )
    }

}
export default withRouter(HeaderComponent);