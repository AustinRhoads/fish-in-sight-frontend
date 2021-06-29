

const getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
}

export function newCatch (caught){

    return(dispatch) => {

        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': getCSRFToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(caught)
        }

        fetch("http://localhost:3000/catches", configObject)
        .then(resp => resp.json())
        .then(resp => {
            console.log("catches res", resp);
        }).catch(error =>{
            console.log("catches error", error)
        });
    }

}