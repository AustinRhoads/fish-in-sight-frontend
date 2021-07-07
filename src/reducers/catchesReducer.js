

export default function catchesReducer (state={all_catches: [], usercatches: [], loading: false,}, action) {

    switch(action.type){

        case "LOADING":

        return {...state, loading: true}

        case "GET_USER_CATCHES":



        return { ...state, userCatches: action.catches, loading: false};

        case "GET_ALL_CATCHES":

        return {...state, all_catches: action.all_catches, loading: false}


        default: 

        return state;
    }

}