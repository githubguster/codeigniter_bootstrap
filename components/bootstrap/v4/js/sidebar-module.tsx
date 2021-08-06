import * as Common from './common';
import * as NavbarModule from './navbar-module';

export interface SidebarProps extends Common.CommonElementProps {
    top?: NavbarModule.NavbarModules,
    default?: NavbarModule.NavbarModules,
    bottom?: NavbarModule.NavbarModules,
    navClassName?: string,
    contentClassName?: string,
    contentElement?: HTMLElement | React.ReactElement,
    active?: boolean,
    expand?: Common.CommonElementExpand,
    variant?: 'light' | 'dark';
}