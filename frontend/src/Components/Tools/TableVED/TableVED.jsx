import { Form, Button, Header, Icon, Input, Menu, MenuItem, Segment, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './TableVED.css';

import React from 'react';



function TableVED(props) {
    
    const Tittle = props.Tittle;
    const ColumnsTittle = props.ColumnsTittle
    const ColumnsKeys = props.ColumnsKeys;
    const data = props.dataToView;
    const onLeftArrClick = props.onLeftArrClick;
    const onRightArrClick = props.onRightArrClick;
    const currentPage = props.currentPage;
    const isLastPage = props.isLastPage;
    const register = props.register;
    const fields = props.fields;
    const onSubmit = props.onSubmit;
    const uniqueKey = props.uniqueKey;

    const createRows = (obj, index)=>{
        
        const rows = [];
        for (const [key, value] of Object.entries(obj)) {
            if(ColumnsKeys.includes(key))
                rows.push(<TableCell key={uniqueKey+key+value}>{value}</TableCell>);
          }
        return rows;
    }

    return (
        <>
        <Segment className='w-full'>
            <Header as="h4">{Tittle}</Header>
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
                            <TableRow key={uniqueKey + index}>
                                {createRows(obj, index)}
                            </TableRow>
                        );
                    })}
                </TableBody>
            
                <TableFooter >
                    <TableRow>
                        <TableHeaderCell colSpan='3'>
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
                    <TableRow >
                    <TableCell colSpan={2} className=' text-text3'>
                        <Form onSubmit={onSubmit} className='flex flex-row'>
                            {fields && fields.map((field, index) =>{
                                if(field.name === "id"){
                                    return (
                                        <input key={uniqueKey + index*4} disabled style={{background:"#f9fafb"}} placeholder='Generated value'></input>
                                    );
                                }
                                return (
                                    <input key={uniqueKey + index*5} {...register(field.name, field.options)} placeholder={field.placeholder} className='w-full h-12' ></input>
                                );
                            })
                        }
                        
                            <Button type="submit" >Add</Button>   

                        </Form>
                    </TableCell>
                        
                    </TableRow>
                </TableFooter>
            </Table>
        </Segment>
        </>
      );
}

export default TableVED;
