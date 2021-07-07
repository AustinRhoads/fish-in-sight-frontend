import userReducer from './userReducer.js'; 
import speciesReducer from './speciesReducer.js'
import catchesReducer from './catchesReducer.js'
import baitsReducer from './baitsReducer.js'
import spotsReducer from './spotsReducer.js'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   userStatus: userReducer,
   species: speciesReducer,
   baits: baitsReducer,
   spots: spotsReducer,
   catches: catchesReducer,
})


export default rootReducer;