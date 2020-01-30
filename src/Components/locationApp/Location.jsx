import React, {Component} from 'react'
import {BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListLocationComponent from './ListLocationComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import RegisterComponent from './RegisterComponent.jsx'
import RegProfileComponent from './RegProfileComponent.jsx'
import ListComponent from './ListComponent.jsx'

class Location extends Component {
    render() {
        return (
            <div className="TodoApp">        
                <Router>
                    <>
                    <HeaderComponent/>
                    <Switch>
                    <Route path="/" exact component={LoginComponent}/>   
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/register" component={RegisterComponent}/>
                    <Route path="/registerUser" component={RegProfileComponent}/>
                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/todos/:id" component={ListComponent}/> 
                    <AuthenticatedRoute path="/todos" component={ListLocationComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>               
                    <Route component={ErrorComponent}/>                
                    </Switch>
                    <FooterComponent/>
                    </>               
                </Router>                               
            </div>
        )
    }
}



export default Location;