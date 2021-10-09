import * as Redux from 'redux';
import {WeatherAction} from './weather-action';

const weather = (state = {}, action) => {
    let ret = undefined;
    switch(action.type) {
        case WeatherAction.SET_WEATHERS:
            //ret = Object.assign([], action.weather.weather);
            ret = action.weather.weather;
            break;
        default:
            ret = state;
            break;
    }
    return ret;
}

const weatherReducer = Redux.combineReducers({
    weather
});

export default weatherReducer;