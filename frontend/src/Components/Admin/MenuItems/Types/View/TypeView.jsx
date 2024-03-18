import { Button, Form, FormField, Grid, GridColumn, GridRow, Header, Icon, Menu, MenuItem, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader, Segment, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './TypeView.css';
import { useDispatch } from 'react-redux';
import React from 'react';
import { fetchTypes, nextPage, previousPage, removeType, updateType } from '../../../../../redux/slices/Type';
import { useForm } from 'react-hook-form';


function TypeView(props) {
    const typesData = props.typesData;

    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(fetchTypes(typesData.currentPage));
    },[typesData.currentPage])

    const [open, setOpen] = React.useState(false)
    const [TypeId, setId] = React.useState(0);
    const [TypeName, setName] = React.useState("");

    const {
        register,
        handleSubmit,
        // setError,
        // formState: { errors, isValid },
      } = useForm({
        defaultValues: {
            id: 0,
            Name: "",
        },
        values:{
            id: TypeId,
            Name: TypeName
        },
        mode: "onChange"
      });
    
      const OnSubmit = async(params) =>{
        console.log(params)
        await dispatch(updateType(params));
        dispatch(fetchTypes(typesData.currentPage));
        setOpen(false);
      }

    
    
    
    return (
        <>
        <Segment className='w-full'>
            <Header>List of types</Header>
            <Table celled>
                <TableHeader>
                <TableRow>
                    <TableHeaderCell>id</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                </TableRow>
                </TableHeader>
            
                <TableBody>
                    {typesData.types?.data && typesData.types.data.map((type, index) => {
                        return (
                            <TableRow className='hover:bg-gray' key={index} onClick={()=>{setId(type.id);setName(type.Name); setOpen(true);}}>
                                <TableCell>{type.id}</TableCell>
                                <TableCell>{type.Name}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            
                <TableFooter>
                <TableRow>
                    <TableHeaderCell colSpan='3'>
                    <Menu floated='right' pagination>
                        <MenuItem as='a' icon onClick={() => dispatch(previousPage())}>
                        <Icon name='chevron left' />
                        </MenuItem>
                        <MenuItem as='a'>{typesData.currentPage}</MenuItem>
                        {typesData.types && Boolean(typesData.types.data.length) &&
                            <MenuItem as='a' icon onClick={() => dispatch(nextPage())}>
                            <Icon name='chevron right' />
                            </MenuItem>
                        }
                    </Menu>
                    </TableHeaderCell>
                </TableRow>
                </TableFooter>
            </Table>
        </Segment>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}>
            <ModalHeader>
                <Grid columns={2}>
                    <GridRow>
                        <GridColumn>Type detail</GridColumn>
                        <GridColumn textAlign='right'>
                            <ModalActions>
                                <Button
                                color="grey"
                                icon='trash'
                                onClick={async() => {
                                    await dispatch(removeType(TypeId));
                                    dispatch(fetchTypes(typesData.currentPage));
                                    setOpen(false);
                                }}
                                />
                                <Button
                                color="red"
                                icon='cancel'
                                onClick={() => setOpen(false)}
                                negative
                                />
                            </ModalActions>
                        </GridColumn>
                    </GridRow>
                </Grid>
                
                
            </ModalHeader>
            <ModalContent>
                <ModalDescription>
                <Form onSubmit={handleSubmit(OnSubmit)}>
                    <FormField className="">
                        <label className="text-slate-50">Name:</label><br />
                        <input
                            {...register("Name", {required: "Name is required.", })}
                            className="pl-2 min-h-9 w-1/2 border-2 rounded font-normal"
                            placeholder="number"
                        />
                    </FormField>
                    <Button
                            type="submit"
                            content="Save"
                            icon='save'
                            positive
                            />
                </Form>

                </ModalDescription>
            </ModalContent>
                
            </Modal>
        </>
      );
}

export default TypeView;
