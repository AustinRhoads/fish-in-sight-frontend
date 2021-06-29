import axios from 'axios';

const getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
}

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
            if(resp.data.logged_in === true){
                
                fetch(`http://localhost:3000/api/v1/users/${resp.data.user.id}`)
                .then(resp => resp.json())
                .then(obj => 
                    dispatch({type: "SET_LOGIN_STATUS", user: obj})
                    );
               
               
            }    
        }).catch(error => {
          console.log("check logged in error: ", error)
        })
    }
}



export function userLogout(){
    return(dispatch)=>{
       // dispatch({type: "LOG_OUT"})
            fetch("http://localhost:3000/logout",
                {
                    method: "DELETE", 
                    credentials: 'include', 
                    headers: {
                        'X-CSRF-Token': unescape(document.cookie.split('=')[1]),
                    }
                }
            )
            .then(
                  dispatch({type: "LOG_OUT"})
                )
            .catch(error => console.log(error))             
    }
}


export function userRegister(newUser){

    return(dispatch) => {

        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': getCSRFToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:3000/registrations", configObject)
        .then(resp => resp.json())
        .then(resp => {
            console.log("registration res", resp);
        }).catch(error =>{
            console.log("registration error", error)
        });


    }   
}

