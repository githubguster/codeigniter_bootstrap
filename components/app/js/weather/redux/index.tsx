import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as WeatherModule from '../weather-module';
import * as WeatherComponents from './weather-components';
import * as WeatherAction from './weather-action';
import { default as weatherReducer } from './weather-reducers';

type WeatherContentProps = WeatherModule.WeatherContentProps & WeatherModule.WeatherContentStatus & {
    dispatch: (...args: any[]) => any,
}

export class WeatherContent extends React.Component<WeatherContentProps>
{
    timerID: NodeJS.Timeout;

    constructor(props : WeatherContentProps) {
        super(props);
    }

    getWeather() {
        WeatherAction.getWeatherAjax(this.props.url, (weather) => {
            this.props.dispatch(WeatherAction.setWeather(weather));
            let now = new Date();
            let date = new Date();
            date.setHours(date.getHours() + 1)
            date.setMinutes(0);
            date.setSeconds(this.props.offset_sec);
            let timeout = date.getTime() - now.getTime();
            this.timerID = setTimeout(() => this.getWeather(), timeout);
        });
    }
    
    componentDidMount() {
        this.timerID = setTimeout(() => this.getWeather(), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    render() {
        return (
            <React.Fragment>
                <ReactBootstrap.Row>
                    {this.props.weather && this.props.weather.length > 0 && <WeatherComponents.WeatherItems weather={this.props.weather}></WeatherComponents.WeatherItems>}
                </ReactBootstrap.Row>
            </React.Fragment>
        );
    }
}

const weatherStateToProps = state => {
    const { weather } = state;
    return {
        weather: weather
    }
};

export const weatherStore = Redux.createStore(
    weatherReducer
)

export default ReactRedux.connect(weatherStateToProps)(WeatherContent);