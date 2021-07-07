


export default function speciesReducer (state = {all_species: []}, action) {


    switch(action.type){

        case "GET_SPECIES":

        return {...state, all_species: action.species};

        default:
            return state;
    }
}