


export function getSpecies() {
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/species`)
        .then(resp => resp.json())
        .then(ary => {
            dispatch({type: "GET_SPECIES", species: ary})

        })
    }
}