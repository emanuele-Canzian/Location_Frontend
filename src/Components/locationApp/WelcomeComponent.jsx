import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class  WelcomeComponent extends Component
{
    render(){
        return (
            <div className="container">
                Welcome {this.props.match.params.email} u can look your locations at <Link to="/todos">Here</Link>
            </div>
        )
    }
}
export default WelcomeComponent;