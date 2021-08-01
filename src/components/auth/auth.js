//import React from 'react'



class Auth {

constructor(){

    this.authenticated = false;

}

async login(functionsObject, configObject){
    
    
   await fetch("http://localhost:3000/sessions", configObject)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.logged_in === true){
          
            this.authenticated = true

            localStorage.setItem('loggedInStatus', "LOGGED_IN")

            functionsObject.login(resp.user);

            functionsObject.redirectPath(resp.user.id)
          
        } else {

            functionsObject.setError(resp.error)

        }
    })
    .catch(error =>{

        functionsObject.setError(error)

    }); 


    
    
}

logout(cb){
    this.authenticated = false;
    cb()
}

isAuthenticated(){
    return this.authenticated
}

}



export default new Auth();