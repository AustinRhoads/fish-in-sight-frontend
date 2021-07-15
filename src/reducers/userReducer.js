//import axios from 'axios'

export default function userReducer (state= {user: {}, allUsers: [], loggedInStatus: "NOT_LOGGED_IN", loading: false}, action){

    switch(action.type){

        case "USER_LOGIN":
            //fetch request maybe
            console.log("USER_LOGIN",action)
        return {...state, user: action.user, loggedInStatus: "LOGGED_IN", loading: true};
        case "USER_LOGGING_IN":

        return state;
        case "LOADING_LOGIN_STATUS":
            return {...state, loading: true}
        case "SET_LOGIN_STATUS":
            return {...state, user: action.user, loggedInStatus: "LOGGED_IN", loading: false}
        case "LOG_OUT":
        console.log("LOGGING OUT OF THIS BIZ")
        return {...state, user: {}, loggedInStatus: "NOT_LOGGED_IN", loading: false}
        case "GET_ALL_USERS":
            return {...state, allUsers: action.allUsers}
        default:
            return state;
    }
}