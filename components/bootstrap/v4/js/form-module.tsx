import * as Common from './common';

export interface FormProps extends Common.CommonElementProps {
    title?: string | HTMLElement | React.ReactElement;
    action: string;
    methode: 'get' | 'post';
    contentElement?: HTMLElement | React.ReactElement;
    className?: string;
    ok: string;
    cancel?: string;
}