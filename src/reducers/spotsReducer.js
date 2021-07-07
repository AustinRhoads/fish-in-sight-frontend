

export default function spotsReducer(state={all_spots: []}, action){

    switch(action.type){

        case "GET_ALL_SPOTS":

        return {...state, all_spots: action.spots}

        default: 
        return state;
    }

}