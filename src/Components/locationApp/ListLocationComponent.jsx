import React, {Component} from 'react'
import LocationDataService from '../../api/location/LocationDataService.js'
import AuthenticationService from './AuthenticationService'
import moment from 'moment'
class ListLocationComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            locations : [],
            message: ""
            
        }
        this.images ={ 
               test: require('./test1.jpg')                    
        }
        this.deleteLocationClicked = this.deleteLocationClicked.bind(this)
        this.updateLocationClicked = this.updateLocationClicked.bind(this)
        this.refreshLocation = this.refreshLocation.bind(this)
        this.addLocationClicked = this.addLocationClicked.bind(this)
    }

    
    render(){
        return <div> 
                <div className="test">
                <h1 className="title">Locations</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="row">
                    <button className="btn btn-success" onClick={this.addLocationClicked}>Add</button>
                </div>
                    <table>
                        <div className="row">{
                            this.state.locations.map ( location =>
                            <div className="card card-size"  key={location.id}>
                                <div className="card-img-top"><img className="card-img-top" src=""></img></div>
                                <div className="card-img-top"><img src={"E:\\Location_app\\Location-API\\src\\main\\java\\com\\example\\LocationAPI\\LocationAPI\\LocationPictures\\" + location.imageName} alt=""/> </div>
                                <div className="card-body vertical">
                                <div><h2 className="card-title mb-2">{location.title}</h2></div>
                                <hr/>
                                <div className="padding-text"><p className="card-text card-text-padding">{location.description}</p></div>                   
                                <div className="bottom-card">
                                    <div>
                                        <div className="card-text mb-2 date">{moment(location.targetDate).format('YYYY-MM-DD')}</div>
                                    </div>
                                    <div className="btn-align">
                                        <button className="btn btn-danger mb-1 " onClick={() => this.deleteLocationClicked(location.id)}>Löschen</button>
                                        <button className="btn btn-secondary btn-space"onClick={() => this.updateLocationClicked(location.id)}>Bearbeiten</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )
                        }
                        </div>
                    </table>
                </div>
             </div>            
    }
    componentWillUnmount(){
        console.log('componentUnmount')
    }
    componentDidMount(){
        console.log('componentDidMount')
        this.refreshLocation();
        console.log(this.state)
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }
    addLocationClicked(id){
        console.log('update '+ id)
        this.props.history.push(`/locations/-1`)
    }
    deleteLocationClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        LocationDataService.deleteLocation(username, id)
            .then (
                response => {
                    this.setState({message : `Delete of Todo ${id} Successful`});
                    this.refreshLocation();
                }
            )
            .catch(
                response => {
                    console.log("delete failed")
                }
            )
    }
    updateLocationClicked(id){
        console.log("Update" + id)
        this.props.history.push(`/locations/${id}`)
    }
    
    refreshLocation(){
        let username = AuthenticationService.getLoggedInUserName()
        console.log("username: "+ username)
        LocationDataService.retrieveAllLocation(username)
        .then(
            response => {
                console.log({locations: response.data})
                this.setState({locations: response.data})
            }
        ).catch(response => {
            console.log('faiiiiiled')
        })
    }

}
export default ListLocationComponent;