

export function getSpots(){
    return (dispatch) => {

        fetch(`http://localhost:3000/api/v1/spots`)
        .then(resp => resp.json())
        .then(ary => {
                dispatch({type: "GET_ALL_SPOTS", spots: ary})
        })

    }
}