import * as Common from '../../../bootstrap/v4/js/common'
import * as Bootstrap from '../../../bootstrap/v4/js/index'

export interface BootstrapNabarContentContainer extends Common.CommonElementProps {
    fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

export type BootstrapNavbarContentProps = {
    url: string,
    container?: BootstrapNabarContentContainer,
    navbar?: Omit<Bootstrap.NavbarModule.NavbarProps, "left" | "default" | "right">,
    main?: Common.CommonElementProps,
    content?: string | HTMLElement | React.ReactElement,
    footer?: Bootstrap.FooterModule.FooterProps,
}

export type BootstrapNavbarContentStatus = {
    left?: Bootstrap.NavbarModule.NavbarModules,
    default?: Bootstrap.NavbarModule.NavbarModules,
    right?: Bootstrap.NavbarModule.NavbarModules,
}