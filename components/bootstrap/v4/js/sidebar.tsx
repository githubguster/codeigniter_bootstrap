import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes, { string } from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';
import * as NavbarModule from './navbar-module';
import * as SidebarModule from './sidebar-module';

class SidebarItem extends React.Component<NavbarModule.Navbar> {
    constructor(props: NavbarModule.Navbar) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickHandle(event, onClick: React.MouseEventHandler<HTMLElement | React.ReactElement>) {
        let element = $(event.target).hasClass('nav-link') || $(event.target).hasClass('dropdown-item') ? $(event.target) : $(event.target).parent();
        $($(element).parents('.sidebar-nav')).find('.active').removeClass('active');
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
        if(this.props.navbarIcon.subMenu) {
            let id = this.props.number + '-' + Math.floor(Math.random() * Number.MAX_VALUE).toString(16);
            return (
                <ReactBootstrap.NavDropdown id={id} title={this.props.name} active={this.props.navbarIcon.subMenu.some((item, index, array) => item.isAction === true)}>
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
                        ? <ReactBootstrap.Image roundedCircle src={this.props.navbarIcon.image} alt={this.props.navbarIcon.imageName || ''} width={this.props.navbarIcon.width || 16} height={this.props.navbarIcon.height || 16}></ReactBootstrap.Image>
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

class SidebarItems extends React.Component<NavbarModule.NavbarModules> {
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
                return <SidebarItem {...item}></SidebarItem>;
            })
        );
    }
}

export class Sidebar extends React.Component<SidebarModule.SidebarProps> {
    constructor(props: SidebarModule.SidebarProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        let id = this.props.id || 'app-sidebar';
        return (
            <div className={'sidebar' + (this.props.className ? ' ' + this.props.className : '') + (this.props.expand ? ' sidebar-expand-' + this.props.expand : ' sidebar-expand') + (this.props.variant ? ' navbar-' + this.props.variant : ' navbar-light')}>
                {/* <ReactBootstrap.Navbar.Toggle aria-controls={id}></ReactBootstrap.Navbar.Toggle> */}
                <div id={id} className={'sidebar-nav' + (this.props.navClassName ? ' ' + this.props.navClassName : '') + (this.props.active ? ' active' : '')}>
                    <div className='d-flex flex-column w-100 h-100'>
                        <div className='flex-fill overflow-y-auto'>
                            {this.props.top && <SidebarItems modules={this.props.top.modules} />}
                            {this.props.default && <SidebarItems modules={this.props.default.modules} />}
                        </div>
                        <ReactBootstrap.Row className='w-100 m-0 p-0'>
                            {this.props.bottom && <SidebarItems modules={this.props.bottom.modules} />}
                        </ReactBootstrap.Row>
                    </div>
                </div>
                <div className={'sidebar-content' + (this.props.contentClassName ? ' ' + this.props.contentClassName : '')}>
                    {this.props.contentElement && this.props.contentElement}
                </div>
            </div>
        );
    }
}

export default Sidebar;