
import axios from 'axios'


class AuthenticationService{

    registerSuccessfulLogin(username,password){
        // let username = 'flo'
        // let password = 'flo'
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log('hallo i bi hiä')
        sessionStorage.setItem('authenticatedUser',username)
       // sessionStorage.setItem('authenticatedPassword', password)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
   
    }
    logout(){
        sessionStorage.removeItem('authenticatedUser')
        // sessionStorage.removeItem('authenticatedPassword')
    }
    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null){
            return false
        }
        return true;
    }
    getLoggedInUserName(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null){
            return ''
        }
        return user
    }
    setupAxiosInterceptors(basicAuthHeader){

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
    executeBasicAuthenticationService(username,password){
        return axios.get('http://localhost:8080/basicauth',
        {headers:{authorization: this.createBasicAuthToken(username,password)}})
    }
    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }
}


export default new AuthenticationService();