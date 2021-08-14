import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes, { string } from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';
import * as Common from './common';
import * as FormModule from './form-module';

export class Form extends React.Component<FormModule.FormProps> {
    constructor(props: FormModule.FormProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        return (
            <ReactBootstrap.Form className={'form-card' + (this.props.className ? ' ' + this.props.className : '')} role='form' action={this.props.action} method={this.props.methode}>
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Row>
                        <ReactBootstrap.Col>
                            <ReactBootstrap.Card>
                                <ReactBootstrap.Card.Header className='bg-transparent border-0'>
                                    <ReactBootstrap.Form.Row className='m-0 p-0'>
                                        <ReactBootstrap.InputGroup>
                                            <ReactBootstrap.InputGroup.Prepend>
                                                <ReactBootstrap.InputGroup.Text></ReactBootstrap.InputGroup.Text>
                                            </ReactBootstrap.InputGroup.Prepend>
                                            <div className='flex-fill text-left'>
                                                <ReactBootstrap.InputGroup.Text>{this.props.title}</ReactBootstrap.InputGroup.Text>
                                            </div>
                                        </ReactBootstrap.InputGroup>
                                    </ReactBootstrap.Form.Row>
                                </ReactBootstrap.Card.Header>
                                <ReactBootstrap.Card.Body>
                                    {this.props.contentElement}
                                    <ReactBootstrap.Form.Group className='float-right'>
                                        <ReactBootstrap.Form.Row>
                                            <ReactBootstrap.Col md>
                                                <ReactBootstrap.Button variant='primary' type='submit' role='button'>{this.props.ok}</ReactBootstrap.Button>
                                            </ReactBootstrap.Col>
                                            {
                                                this.props.cancel &&
                                                <ReactBootstrap.Col md>
                                                    <ReactBootstrap.Button variant='danger' type='submit' role='button'>{this.props.cancel}</ReactBootstrap.Button>
                                                </ReactBootstrap.Col>
                                            }
                                        </ReactBootstrap.Form.Row>
                                    </ReactBootstrap.Form.Group>
                                </ReactBootstrap.Card.Body>
                            </ReactBootstrap.Card>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Form.Row>
                </ReactBootstrap.Form.Group>
            </ReactBootstrap.Form>
        );
    }
}

export default Form;