import axios from 'axios'
import{API_URL , API_URL_JPA} from '../../Components/locationApp/Constants'

class LocationDataService{
    retrieveAllLocation(name){
        return axios.get(`${API_URL_JPA}/users/${name}/locations`);
    }
    deleteLocation(name,id){
        return axios.delete(`${API_URL_JPA}/users/${name}/locations/${id}`);
    }
    updateLocation(name,id,todos){
        return axios.put(`${API_URL_JPA}/users/${name}/locations/${id}`, todos);
    }
    createLocation(name, todo) {
        return axios.post(`${API_URL_JPA}/users/${name}/locations/`, todo);
    } 
    retrieveLocation(name, id){
        return axios.get(`${API_URL_JPA}/users/${name}/locations/${id}`);
    }
    upload(data) {
            return axios.post(`${API_URL_JPA}/upload`, data);
    }
}
export default new LocationDataService()