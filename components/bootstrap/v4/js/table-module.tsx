import * as Common from './common';

export type TableHead = Common.CommonElementProps & {
    title: string,
}

export type TableBody = Common.CommonElementProps & {
    colspan?: number,
    rowspan?: number,
    title: string,
    value: string | HTMLElement | React.ReactElement,
}

export type TablePaginationEventHander = (number) => void;

export type TablePaginationItem = Common.CommonElementProps & {
    label: string;
    active?: boolean;
    disabled?: boolean;
    href?: string;
    onClickPage?: TablePaginationEventHander;
}

export type TablePagination = {
    pagination: TablePaginationItem[],
}

export function GetNumberTablePagination(start: number, end: number, index: number, max: number = 5, href: string = undefined, onClick: TablePaginationEventHander = undefined) : TablePagination {
    let pageination : TablePagination = {
        pagination: [],
    }
    let _media = Math.floor(max / 2);
    let _start = Math.max(index - _media, start);
    let _end = Math.min(index + _media, end);

    pageination.pagination.push({
        label: '«',
        active: false,
        disabled: index - 1 < start,
        onClick: (event) => {
            let previousIndex = index - 1;
            if(previousIndex >= start) {
                if(pageination.pagination[previousIndex].href) {
                    window.location.href = pageination.pagination[previousIndex].href;
                } else if(pageination.pagination[previousIndex].onClickPage) {
                    pageination.pagination[previousIndex].onClickPage(previousIndex);
                }
            }
        }
    });

    for(; _start <= _end; _start++) {
        let _index = _start;
        pageination.pagination.push({
            label: _index.toString(),
            active: _index === index,
            href: href && href + '/' + _index,
            onClick: onClick ? (event) => {
                onClick(_index);
            } : undefined,
            onClickPage: onClick,
        });
    }

    pageination.pagination.push({
        label: '»',
        active: false,
        disabled: index + 1 > end,
        onClick: (event) => {
            let nextIndex = index + 1;
            if(nextIndex <= end) {
                if(pageination.pagination[nextIndex].href) {
                    window.location.href = pageination.pagination[nextIndex].href;
                } else if(pageination.pagination[nextIndex].onClickPage) {
                    pageination.pagination[nextIndex].onClickPage(nextIndex);
                }
            }
        }
    });

    return pageination;
}

export interface TableProps extends Common.CommonElementProps {
    size?: string,
    head: TableHead[],
    body?: TableBody[][],
    page?: TablePagination,
}