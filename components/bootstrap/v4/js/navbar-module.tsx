import * as Common from './common';

export type NavbarItem = Common.CommonElementProps & {
    isImage: boolean,
    image?: string,
    imageName?: string,
    width?: number,
    height?: number,
    css?: string,
    name: string | HTMLElement | React.ReactElement,
    href: string,
    badgeNumber?: number,
    isDivider?: boolean,
    isAction?: boolean,
}

export type NavbarIcon = Common.CommonElementProps & {
    isImage: boolean,
    image?: string,
    imageName?: string,
    width?: number,
    height?: number,
    css?: string,
    isDivider?: boolean,
    subMenu?: NavbarItem[]
}

export type Navbar = Common.CommonElementProps & {
    number: number,
    name: string | HTMLElement | React.ReactElement,
    navbarIcon: NavbarIcon,
    badgeNumber?: number,
    href: string,
    isAction?: boolean,
}

export type NavbarModules = Common.CommonElementProps & {
    modules: Navbar[],
}

export interface NavbarProps extends Common.CommonElementProps {
    left?: NavbarModules,
    default?: NavbarModules,
    right?: NavbarModules,
    href?: string,
    icon?: string,
    title?: string,
    width?: number,
    height?: number,
    expand?: Common.CommonElementExpand,
    fixed?: Common.CommonElementFixed,
    variant?: 'light' | 'dark';
}