import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class  WelcomeComponent extends Component
{
    render(){
        return (
            <div className="container">
                Welcome <b>{this.props.match.params.name}</b> u can look your locations at <Link to="/locations">Here</Link>
            </div>
        )
    }
}
export default WelcomeComponent;