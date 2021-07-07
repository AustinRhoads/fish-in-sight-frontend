


export default function baitsReducer(state={all_baits: []}, action){

    switch(action.type){

        case "GET_ALL_BAITS":

        return {...state, all_baits: action.baits}

        default: 
        return state;
    }

}