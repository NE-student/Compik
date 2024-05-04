import { Button, Form, FormField, Grid, GridColumn, GridRow, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader} from 'semantic-ui-react';
import './ModalOfObject.css';
import React from 'react';


function ModalOfObject(props) {
    
    const Tittle = props.Tittle;
    const fields = props.fields;
    const onModalClose = props.onModalClose;
    const onModalOpen = props.onModalOpen;
    const onSubmit = props.onSubmit;
    const register = props.register;
    const onTrashClick = props.onTrashClick;
    const stateOfModal = props.stateOfModal
    
    return (
        <>
        <Modal
            onClose={onModalClose}
            onOpen={onModalOpen}
            open={stateOfModal}>
            <ModalHeader>
                <Grid columns={2}>
                    <GridRow>
                        <GridColumn>{Tittle}</GridColumn>
                        <GridColumn textAlign='right'>
                            <ModalActions>
                                <Button
                                Property="submit"
                                content="Save"
                                icon='save'
                                positive
                                onClick={onSubmit}
                                />
                                <Button
                                color="grey"
                                content="Delete"
                                icon='trash'
                                onClick={onTrashClick}
                                />
                                <Button
                                color="red"
                                icon='cancel'
                                onClick={onModalClose}
                                negative
                                />
                            </ModalActions>
                        </GridColumn>
                    </GridRow>
                </Grid>
                
                
            </ModalHeader>
            <ModalContent>
                <ModalDescription>
                <Form>
                    {fields.map((field, index)=>{
                        if (field.name === "Description"){
                            return(
                                <FormField key={index} className="">
                                    <label className="text-slate-50">{field.name}:</label><br />
                                    <textarea
                                        {...register(field.name, field.options)}
                                        className="pl-2 min-h-9 w-1/2 border-2 rounded font-normal"
                                        placeholder={field.placeholder}
                                    />
                                </FormField>
                            )
                        }
                        return(
                            <FormField key={index} className="">
                                <label className="text-slate-50">{field.name}:</label><br />
                                <input
                                    type={field.type}
                                    {...register(field.name, field.options)}
                                    className="pl-2 min-h-9 border-2 rounded font-normal"
                                    placeholder={field.placeholder}
                                />
                            </FormField>
                        );
                    })}
                    
                </Form>
                {props.addBottom}
                </ModalDescription>
            </ModalContent>
        </Modal>
        </>
      );
}

export default ModalOfObject;
