import axios from 'axios';

export function userLogin(user){
    return(dispatch) => {
        dispatch({type: "USER_LOGGING_IN", user: user});
        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': unescape(document.cookie.split('=')[1]),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
      
        fetch("http://localhost:3000/sessions", configObject)
        .then(resp => resp.json())
        .then(resp => {
            if (resp.logged_in === true){
                dispatch({type: "SET_LOGIN_STATUS", user: resp.user})
            } else {
                console.log(resp)
            }
        })
        .catch(error =>{
            console.log("Login error", error)
        });

        
        
    }
}

export function checkLogin(){

    return(dispatch) => {
        dispatch({type: "LOADING_LOGIN_STATUS"});
        axios.get('http://localhost:3000/logged_in', {withCredentials: true})
        .then(resp => {
            dispatch({type: "SET_LOGIN_STATUS", user: resp.data.user})
        }).catch(error => {
          console.log("check logged in error: ", error)
        })
    }
}

export function registerUser(){
    return(dispatch) =>{

    }
}

