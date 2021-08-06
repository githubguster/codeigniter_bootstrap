import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes, { string } from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';
import * as Common from './common';
import * as TableModule from './table-module';

export class TablePagination extends React.Component<TableModule.TablePagination> {
    constructor(props: TableModule.TablePagination) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ReactBootstrap.Pagination>
                {
                    this.props.pagination.map((page) => {
                        return(
                            <ReactBootstrap.Pagination.Item className={page.className} href={page.href} active={page.active} disabled={page.disabled} onClick={page.onClick}>{page.label}</ReactBootstrap.Pagination.Item>
                        );
                    })
                }
            </ReactBootstrap.Pagination>
        )
    }
}

export class Table extends React.Component<TableModule.TableProps> {
    constructor(props: TableModule.TableProps) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        return (
            <React.Fragment>
                <ReactBootstrap.Table id={this.props.id} {...this.props.attribute} size={this.props.size || 'md'}>
                    <thead>
                        <tr>
                            {
                                this.props.head.map((head) => {
                                    return (
                                        <th className={head.className} {...head.attribute} data-th={head.title}>{head.title}</th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.body?.map((row) => {
                                return (
                                    <tr>
                                        {
                                            row.map((body) => {
                                                return (
                                                    <td className={body.className} {...body.attribute} colSpan={body.colspan} rowSpan={body.rowspan} data-th={body.title}>{body.value}</td>
                                                );
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </ReactBootstrap.Table>
                {this.props.page && <TablePagination pagination={this.props.page.pagination}></TablePagination>}
            </React.Fragment>
        );
    }
}

export default Table;