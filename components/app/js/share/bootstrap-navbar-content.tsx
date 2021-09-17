import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import * as Bootstrap from '../../../bootstrap/v4/js/index'
import * as BootstrapNavbarModule from './bootstrap-navbar-content-module';

export class BootstrapNavbarContent extends React.Component<BootstrapNavbarModule.BootstrapNavbarContentProps, BootstrapNavbarModule.BootstrapNavbarContentStatus>
{
    constructor(props : BootstrapNavbarModule.BootstrapNavbarContentProps) {
        super(props);
        this.state = {
            left: null,
            default: null,
            right: null,
        };
    }

    getNavbarModules() {
        $.get({
            url: this.props.url,
            dataType: 'json',
        }).done((json) => {
            this.setState({
                left: {
                    modules: json.left
                },
                default: {
                    modules: json.default
                },
                right: {
                    modules: json.right
                },
            });
        });
    }

    componentDidMount() {
        this.getNavbarModules();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <React.Fragment>
                <ReactBootstrap.Container {...this.props.container}>
                    <Bootstrap.Navbar 
                        left={this.state.left} 
                        default={this.state.default} 
                        right={this.state.right}
                        {...this.props.navbar}
                    ></Bootstrap.Navbar>
                    <main {...this.props.main}>
                        {this.props.content && this.props.content}
                    </main>
                </ReactBootstrap.Container>
                <Bootstrap.Footer {...this.props.footer}></Bootstrap.Footer>
            </React.Fragment>
        );
    }
}


export default BootstrapNavbarContent;