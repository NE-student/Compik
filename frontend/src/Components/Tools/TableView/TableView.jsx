import { Header, Icon, Menu, MenuItem, Segment, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './TableView.css';

import React from 'react';



function TableView(props) {
    
    const Tittle = props.Tittle;
    const ColumnsTittle = props.ColumnsTittle;
    const ColumnsKeys = props.ColumnsKeys;
    const data = props.dataToView;
    const onRowClick = props.onRowClick;
    const onLeftArrClick = props.onLeftArrClick;
    const onRightArrClick = props.onRightArrClick;
    const currentPage = props.currentPage;
    const isLastPage = props.isLastPage;
    const uniqueKey = props.uniqueKey;
    
    const createRows = (obj, index)=>{
        const rows = [];
        for (const [key, value] of Object.entries(obj)) {
            if(ColumnsKeys.includes(key)){
                if(value instanceof Object){
                    rows.push(<TableCell key={uniqueKey+key+value}>{value.Name}</TableCell>);
                    continue;
                }
                rows.push(<TableCell key={uniqueKey+key+value}>{value}</TableCell>);}
          }
        return rows;
    }

    return (
        <>
        <Segment className='w-full'>
            <Header>{Tittle}</Header>
            <Table celled>
                <TableHeader>
                <TableRow>
                    {ColumnsTittle && ColumnsTittle.map((col, index) =>{
                        return (
                            <TableHeaderCell key={uniqueKey + index*2}>{col}</TableHeaderCell>
                        );
                    })
                    }
                </TableRow>
                </TableHeader>
            
                <TableBody>
                    {Boolean(data) && data.map((obj, index) => {   
                        return (
                            <TableRow className='hover:bg-gray' key={uniqueKey + index} onClick={()=>{onRowClick(obj)}}>
                                {createRows(obj, index)}
                            </TableRow>
                        );
                    })}
                </TableBody>
            
                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan={ColumnsKeys.length}>
                        <Menu floated='right' pagination>
                            <MenuItem as='a' icon onClick={() => onLeftArrClick()}>
                                <Icon name='chevron left' />
                            </MenuItem>
                            <MenuItem as='a'>{currentPage}</MenuItem>
                            
                            {isLastPage &&
                                <MenuItem as='a' icon onClick={() => onRightArrClick()}>
                                    <Icon name='chevron right' />
                                </MenuItem>
                            }

                        </Menu>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Segment>
        </>
      );
}

export default TableView;
