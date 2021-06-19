import userReducer from './userReducer.js'; 
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   user: userReducer,
})


export default rootReducer;