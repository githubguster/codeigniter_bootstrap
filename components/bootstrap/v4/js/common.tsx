
export type CommonElementExpand = boolean | 'sm' | 'md' | 'lg' | 'xl';

export type CommonElementFixed = 'top' | 'bottom';

export interface CommonElementProps {
    id?: string;
    className?: string;
    attribute?: any;
    onClick?: React.MouseEventHandler<HTMLElement | React.ReactElement>;
}