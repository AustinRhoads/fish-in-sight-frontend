

export default function catchesReducer (state={allCatches: [], usercatches: [], loading: false, filtered: []}, action) {

    switch(action.type){

        case "LOADING":

        return {...state, loading: true}

        case "GET_USER_CATCHES":



        return { ...state, userCatches: action.catches, loading: false};

        case "GET_ALL_CATCHES":

        return {...state, allCatches: action.allCatches, loading: false}

        case  "SET_FILTERED_USER_CATCHES":

        return {...state, filtered: action.filtered};
        default: 

        return state;
    }

}