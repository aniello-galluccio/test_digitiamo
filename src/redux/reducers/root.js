import {combineReducers} from 'redux';
import menuReducer from './menu';
import requestReducer from './request';

const rootReducer = combineReducers({
    menu: menuReducer,
    request: requestReducer
});

export default rootReducer;