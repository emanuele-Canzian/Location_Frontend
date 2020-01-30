import React, {Component} from 'react'
import LocationDataService from '../../api/location/LocationDataService.js'
import AuthenticationService from './AuthenticationService'
import moment from 'moment'

class ListLocationComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            locations : []
        }
        this.images ={ 
            
               test: require('./test1.jpg')
               
                            
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)  
    }

    
    render(){
        return <div> 
                <div className="test">
                <h1 className="title">Locations</h1>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
                    <table>
                        <tbody className="row">{
                            this.state.locations.map ( location =>
                            <tr className="card card-size"  key={location.id}>
                                <td className="card-img-top"><img className="card-img-top" src={this.images.test} /></td>
                                <div className="card-body vertical">
                                <td><h2 className="card-title mb-2">{location.title}</h2></td>
                                <hr/>
                                <td className="padding-text"><p className="card-text card-text-padding">{location.description}</p></td>
                                
                                <div className="bottom-card">
                                    <div>
                                        <td className="card-text mb-2 date">{moment(location.targetDate).format('YYYY-MM-DD')}</td>
                                    </div>
                                    <div className="btn-align">
                                        <button className="btn btn-danger mb-1 " onClick={() => this.deleteTodoClicked(location.id)}>Löschen</button>
                                        <button className="btn btn-secondary btn-space"onClick={() => this.updateTodoClicked(location.id)}>Bearbeiten</button>
                                    </div>
                                </div>
                                </div>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
             </div>            
    }
    componentWillUnmount(){
        console.log('componentUnmount')
    }
    componentDidMount(){
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }
    addTodoClicked(id){
        console.log('update '+ id)
        this.props.history.push(`/todos/-1`)
    }
    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        LocationDataService.deleteTodo(username, id)
            .then (
                response => {
                    this.setState({message : `Delete of Todo ${id} Successful`});
                    this.refreshTodos();
                }
            )
            .catch(
                response => {
                    console.log("delete failed")
                }
            )
    }
    updateTodoClicked(id){
        console.log("Update" + id)
        this.props.history.push(`/todos/${id}`)
    }
    
    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName()
        console.log("username: "+ username)
        LocationDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log('yeah')
                this.setState({locations: response.data})
            }
        ).catch(response => {
            console.log('faiiiiiled')
        })
    }

}
export default ListLocationComponent;