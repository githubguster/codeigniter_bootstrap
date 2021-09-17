import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes, { string } from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';
import * as NavbarModule from './navbar-module';

class NavbarItem extends React.Component<NavbarModule.Navbar> {
    constructor(props: NavbarModule.Navbar) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickHandle(event, onClick: React.MouseEventHandler<HTMLElement | React.ReactElement>) {
        let element = $(event.target).hasClass('nav-link') || $(event.target).hasClass('dropdown-item') ? $(event.target) : $(event.target).parent();
        $($($(element).parents('.navbar')).find('.active')).removeClass('active');
        console.log($($($(element).parents('.navbar')).find('.active')));
        $(element).addClass('active');
        $.each($(element).parents('.dropdown-menu'), function(_, element) {
            let id = $(element).attr('aria-labelledby');
            $($($(element).parent()).find(('#' + id))).addClass('active');
        });
        
        if(onClick) {
            onClick(event);
        }
    }

    render() {
        if(this.props.navbarIcon.subMenu && this.props.navbarIcon.subMenu.length > 0) {
            let id = this.props.number + '-' + Math.floor(Math.random() * Number.MAX_VALUE).toString(16);
            return (
                <ReactBootstrap.NavDropdown id={id} title={this.props.name} active={this.props.navbarIcon.subMenu.some((item, index, array) => item.isAction === true)} >
                    {
                        this.props.navbarIcon.isImage && this.props.navbarIcon.image 
                        ? <ReactBootstrap.Image roundedCircle src={this.props.navbarIcon.image} alt={this.props.navbarIcon.imageName || ''} width={this.props.navbarIcon.width || 16} height={this.props.navbarIcon.height || 16}></ReactBootstrap.Image>
                        : this.props.navbarIcon.css && <span className={this.props.navbarIcon.css}></span>
                    }
                    {
                        this.props.badgeNumber > 0 && <ReactBootstrap.Badge pill variant='danger'>{this.props.badgeNumber}</ReactBootstrap.Badge>
                    }
                    {
                        this.props.navbarIcon.subMenu.map((item, _) => {
                            if(item.isDivider) {
                                return (
                                    <ReactBootstrap.NavDropdown.Divider></ReactBootstrap.NavDropdown.Divider>
                                );
                            } else {
                                return (
                                    <ReactBootstrap.NavDropdown.Item href={item.href} onClick={(event) => this.clickHandle(event, item.onClick)} active={item.isAction}>
                                        {
                                            item.isImage && item.image
                                            ? <ReactBootstrap.Image roundedCircle src={item.image} alt={item.imageName || ''} width={item.width || 16} height={item.height || 16}></ReactBootstrap.Image>
                                            : item.css && <span className={item.css}></span>
                                        }
                                        {
                                            item.name
                                        }
                                        {
                                            item.badgeNumber > 0 && <ReactBootstrap.Badge pill variant='danger'>{item.badgeNumber}</ReactBootstrap.Badge>
                                        }
                                    </ReactBootstrap.NavDropdown.Item>
                                );
                            }
                        })
                    }
                </ReactBootstrap.NavDropdown>
            );
        } else if(this.props.navbarIcon.isDivider) {
            return (
                <ReactBootstrap.NavDropdown.Divider></ReactBootstrap.NavDropdown.Divider>
            )
        } else {
            return (
                <ReactBootstrap.Nav.Link href={this.props.href} onClick={(event) => this.clickHandle(event, this.props.onClick)} active={this.props.isAction}>
                    {
                        this.props.navbarIcon.isImage && this.props.navbarIcon.image 
                        ? <ReactBootstrap.Image roundedCircle src={this.props.navbarIcon.image} alt={this.props.navbarIcon.imageName || ''} width={this.props.navbarIcon.width || 16} height={this.props.navbarIcon.height || 16} ></ReactBootstrap.Image>
                        : this.props.navbarIcon.css && <span className={this.props.navbarIcon.css}></span>
                    }
                    {
                        this.props.name
                    }
                    {
                        this.props.badgeNumber > 0 && <ReactBootstrap.Badge pill variant='danger'>{this.props.badgeNumber}</ReactBootstrap.Badge>
                    }
                </ReactBootstrap.Nav.Link>
            );
        }
    }
}

class NavbarItems extends React.Component<NavbarModule.NavbarModules> {
    constructor(props: NavbarModule.NavbarModules) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            this.props.modules.map((item, _) => {
                return <NavbarItem {...item}></NavbarItem>;
            })
        );
    }
}

export class NavbarFixedTop extends React.Component<NavbarModule.NavbarProps> {
    constructor(props: NavbarModule.NavbarProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        let id = this.props.id || 'app-navbar';
        return (
            <ReactBootstrap.Navbar className={this.props.className} expand={this.props.expand} fixed={this.props.fixed} variant={this.props.variant} {...this.props.attribute}>
                <ReactBootstrap.Navbar.Brand href={this.props.href} onClick={this.props.onClick}>
                    {this.props.icon && <ReactBootstrap.Image roundedCircle src={this.props.icon} alt={this.props.title || ''} width={this.props.width || 32} height={this.props.height || 32}></ReactBootstrap.Image>}
                    {this.props.title || ''}
                </ReactBootstrap.Navbar.Brand>
                <ReactBootstrap.Navbar.Toggle aria-controls={id}></ReactBootstrap.Navbar.Toggle>
                <ReactBootstrap.Navbar.Collapse id={id}>
                    {this.props.left && this.props.left.modules.length > 0 && <ReactBootstrap.Nav className='mr-auto'><NavbarItems modules={this.props.left.modules} /></ReactBootstrap.Nav>}
                    {this.props.default && this.props.default.modules.length > 0 && <ReactBootstrap.Nav className='mr-auto'><NavbarItems modules={this.props.default.modules} /></ReactBootstrap.Nav>}
                    {this.props.right && this.props.right.modules.length > 0 && <ReactBootstrap.Nav className='ml-auto'><NavbarItems modules={this.props.right.modules} /></ReactBootstrap.Nav>}
                </ReactBootstrap.Navbar.Collapse>
            </ReactBootstrap.Navbar>
        );
    }
}

export default NavbarFixedTop;