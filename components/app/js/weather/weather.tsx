import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import * as Bootstrap from '../../../bootstrap/v4/js/index'
import * as WeatherModule from './weather-module';

class Weather extends React.Component<WeatherModule.WeatherProps> 
{
    constructor(props : WeatherModule.WeatherProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <React.Fragment>
                <ReactBootstrap.Col md="2">
                    <ReactBootstrap.Card>
                        <ReactBootstrap.Card.Header className="text-center">{this.props.location}</ReactBootstrap.Card.Header>
                        <ReactBootstrap.Card.Body>
                            <ReactBootstrap.Row>
                                <ReactBootstrap.Col md="12" className="text-center">
                                    <a href={"https://maps.google.com/maps?q=" + this.props.lat_wgs84 + "," + this.props.lon_wgs84} target="_blank"><i className="fas fa-map-marked-alt"></i></a>
                                </ReactBootstrap.Col>
                            </ReactBootstrap.Row>
                            <ReactBootstrap.Row>
                                <ReactBootstrap.Col md="12" className="text-center">
                                    <span >{this.props.time}</span>
                                </ReactBootstrap.Col>
                            </ReactBootstrap.Row>
                            <ReactBootstrap.Row>
                                <ReactBootstrap.Col md="6" className="text-center">
                                    <ReactBootstrap.InputGroup>
                                        <ReactBootstrap.InputGroup.Prepend>
                                            <ReactBootstrap.InputGroup.Text><i className="fas fa-thermometer-half"></i></ReactBootstrap.InputGroup.Text>
                                        </ReactBootstrap.InputGroup.Prepend>
                                        <span className="form-control">{this.props.temp !== -99 ? this.props.temp : '-'}</span>
                                    </ReactBootstrap.InputGroup>
                                </ReactBootstrap.Col>
                                <ReactBootstrap.Col md="6" className="text-center">
                                    <ReactBootstrap.InputGroup>
                                        <ReactBootstrap.InputGroup.Prepend>
                                            <ReactBootstrap.InputGroup.Text><i className="fas fa-tint"></i></ReactBootstrap.InputGroup.Text>
                                        </ReactBootstrap.InputGroup.Prepend>
                                            <span className="form-control">{this.props.humd !== -99 ? this.props.humd : '-'}</span>
                                    </ReactBootstrap.InputGroup>
                                </ReactBootstrap.Col>
                            </ReactBootstrap.Row>
                            <ReactBootstrap.Row>
                                <ReactBootstrap.Col md="6" className="text-center">
                                    <ReactBootstrap.InputGroup>
                                        <ReactBootstrap.InputGroup.Prepend>
                                            <ReactBootstrap.InputGroup.Text><i className="fas fa-paper-plane"></i></ReactBootstrap.InputGroup.Text>
                                        </ReactBootstrap.InputGroup.Prepend>
                                        <span className="form-control">{this.props.wdir !== -99 ? this.props.wdir : '-'}</span>
                                    </ReactBootstrap.InputGroup>
                                </ReactBootstrap.Col>
                                <ReactBootstrap.Col md="6" className="text-center">
                                    <ReactBootstrap.InputGroup>
                                        <ReactBootstrap.InputGroup.Prepend>
                                            <ReactBootstrap.InputGroup.Text><i className="far fa-flag"></i></ReactBootstrap.InputGroup.Text>
                                        </ReactBootstrap.InputGroup.Prepend>
                                        <span className="form-control">{this.props.wdsd !== -99 ? this.props.wdsd : '-'}</span>
                                    </ReactBootstrap.InputGroup>
                                </ReactBootstrap.Col>
                            </ReactBootstrap.Row>
                            <ReactBootstrap.Row>
                                <ReactBootstrap.Col md="12" className="text-center">
                                    <ReactBootstrap.InputGroup>
                                        <ReactBootstrap.InputGroup.Prepend>
                                            <ReactBootstrap.InputGroup.Text><i className="fas fa-cloud-rain"></i></ReactBootstrap.InputGroup.Text>
                                        </ReactBootstrap.InputGroup.Prepend>
                                        <span className="form-control">{this.props.h24r !== -99 ? this.props.h24r : '-'}</span>
                                    </ReactBootstrap.InputGroup>
                                </ReactBootstrap.Col>
                            </ReactBootstrap.Row>
                        </ReactBootstrap.Card.Body>
                    </ReactBootstrap.Card>
                </ReactBootstrap.Col>
            </React.Fragment>
        );
    }
}

class WeatherItems extends React.Component<WeatherModule.WeatherItemsProps> {
    constructor(props: WeatherModule.WeatherItemsProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            this.props.weather.map((item, _) => {
                return (<Weather {...item}></Weather>);
            })
        );
    }
}

export class WeatherContent extends React.Component<WeatherModule.WeatherContentProps, WeatherModule.WeatherContentStatus>
{
    timerID: NodeJS.Timeout;

    constructor(props : WeatherModule.WeatherContentProps) {
        super(props);
        this.state = {
            weather: null,
        }
    }

    getWeather() {
        $.get({
            url: this.props.url,
            dataType: 'json',
        }).done((json) => {
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
                this.setState({
                    weather: weather,
                });
                let now = new Date();
                let date = new Date();
                date.setHours(date.getHours() + 1)
                date.setMinutes(0);
                date.setSeconds(0);
                let timeout = date.getTime() - now.getTime();
                this.timerID = setTimeout(() => this.getWeather(), timeout);
            }
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
                    {this.state.weather && this.state.weather.length > 0 && <WeatherItems weather={this.state.weather}></WeatherItems>}
                </ReactBootstrap.Row>
            </React.Fragment>
        );
    }
}

export default WeatherContent;