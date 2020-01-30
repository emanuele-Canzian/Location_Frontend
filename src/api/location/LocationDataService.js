import axios from 'axios'

class LocationDataService{
    retrieveAllTodos(name){
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }
    deleteTodo(name,id){
        return axios.delete(`http://localhost:8080/users/${name}/locations/${id}`);
    }
    updateTodo(name,id,todos){
        return axios.put(`http://localhost:8080/users/${name}/locations/${id}`, todos);
    }
    createTodo(name, todo) {
        return axios.post(`http://localhost:8080/users/${name}/locations/`, todo);
    } 
    retrieveTodo(name, id){
        return axios.get(`http://localhost:8080/users/${name}/locations/${id}`);
    }
}
export default new LocationDataService()