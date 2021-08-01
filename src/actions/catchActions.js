

const getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
}

export function createNewCatch (caught){

    return(dispatch) => {

        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': getCSRFToken(),
                'Content-Type': 'application/json'
            },
            body: caught
        }

        fetch("http://localhost:3000/api/v1/catches", configObject)
        .then(resp => resp.json())
        .then(resp => {
            return resp
            //console.log("catches res", resp);
        }).catch(error =>{
            return error
           // console.log("catches error", error)
        });
    }

}

export function getUserCatches (uid){
    return (dispatch) => {
        dispatch({type: "LOADING"})
        fetch(`http://localhost:3000/api/v1/users/${uid}`)
        .then(resp => resp.json())
        .then(obj => {
        
            if(obj){
                console.log("catches obj",obj.catches)
              dispatch({type: "GET_USER_CATCHES", catches: obj.catches})
            }
            
           
        })

    }
}


export function filterUserCatches(filtered){
    return(dispatch) => {
        dispatch({type: "SET_FILTERED_USER_CATCHES", filtered: filtered})
    }
}

export function getAllCatches(){
    return(dispatch) => {
        fetch("http://localhost:3000/api/v1/catches")
        .then(resp => resp.json())
        .then(obj => {
            dispatch({type: "GET_ALL_CATCHES", allCatches: obj})
        })
    }
}