import userReducer from './userReducer.js'; 
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   userStatus: userReducer,
})


export default rootReducer;