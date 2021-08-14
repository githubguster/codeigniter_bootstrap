import * as Common from './common';

export interface FooterProps extends Common.CommonElementProps {
    title: string | HTMLElement | React.ReactElement;
    fixedBottom?: boolean;
}