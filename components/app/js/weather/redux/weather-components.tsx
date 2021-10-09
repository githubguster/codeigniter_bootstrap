import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import * as WeatherModule from '../weather-module';

export class Weather extends React.Component<WeatherModule.WeatherProps> 
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

export class WeatherItems extends React.Component<WeatherModule.WeatherItemsProps> {
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