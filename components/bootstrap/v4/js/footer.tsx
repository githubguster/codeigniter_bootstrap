import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes, { string } from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';
import * as FooterModule from './footer-module';

export class FooterFixedBottom extends React.Component<FooterModule.FooterProps> {
    constructor(props: FooterModule.FooterProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        return (
            <footer id={this.props.id} className={'footer text-center' + (this.props.fixedBottom ? ' fixed-bottom' : '')} {...this.props.attribute}>
                <ReactBootstrap.Col lg-12>
                    <small>{this.props.title}</small>
                </ReactBootstrap.Col>
            </footer>
        );
    }
}

export default FooterFixedBottom;