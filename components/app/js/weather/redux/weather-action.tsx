import * as $ from 'jquery'
import * as WeatherModule from '../weather-module';

export const WeatherAction = {
    SET_WEATHERS: 'SET_WEATHERS',
};

export const setWeather = (weather: WeatherModule.WeatherItemsProps) => ({
    type: WeatherAction.SET_WEATHERS,
    weather: weather
});

const getWeatherAjax = (url: string, finish?: (weather?: WeatherModule.WeatherItemsProps) => void) => {
    return (
        $.get({
            url: url,
            dataType: 'json',
        }).done(json => {
            if(Array.isArray(json)) {
                let weather = [];
                $.each(json, function(_, item) {
                    let value = {
                        location: item.locationName,
                        lat: item.lat,
                        lon: item.lon,
                        lat_wgs84: item.lat_wgs84,
                        lon_wgs84: item.lon_wgs84,
                        time: item.time.obsTime,
                        elev: 0,
                        wdir: 0,
                        wdsd: 0,
                        temp: 0,
                        humd: 0,
                        pres: 0,
                        h24r: 0,
                    };
                    $.each(item.weatherElement, function(_, element) {
                        switch(element.elementName) {
                            case "ELEV":
                                value.elev = parseFloat(element.elementValue.value);
                                break;
                            case "WDIR":
                                value.wdir = parseFloat(element.elementValue.value);
                                break;
                            case "WDSD":
                                value.wdsd = parseFloat(element.elementValue.value);
                                break;
                            case "TEMP":
                                value.temp = parseFloat(element.elementValue.value);
                                break;
                            case "HUMD":
                                value.humd = parseFloat(element.elementValue.value);
                                break;
                            case "PRES":
                                value.pres = parseFloat(element.elementValue.value);
                                break;
                            case "H_24R":
                                value.h24r = parseFloat(element.elementValue.value);
                                break;
                        }
                    });
                    weather.push(value);
                });
                if(finish) {
                    finish({weather: weather});
                }
            }
        })
    );
}

export const getWeather = (url: string, finish?: (weather?: WeatherModule.WeatherItemsProps) => void) => dispatch => {
    return getWeatherAjax(url, weather => {
        dispatch(setWeather(weather));
        if(finish) {
            finish(weather);
        }
    });
}