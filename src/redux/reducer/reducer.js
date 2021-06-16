import { combineReducers } from 'redux'


import fetchReposReducer from './fetchReposReducer';


const rootReducer = combineReducers({
    fetchReposReducer
});

export default rootReducer;