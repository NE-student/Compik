import { Button, Form, FormField, Header, Segment} from 'semantic-ui-react';
import './TypeCreate.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createType, fetchTypes } from '../../../../../redux/slices/Type';



function TypeCreate(props) {
    const typesData = props.typesData;

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        // setError,
        // formState: { errors, isValid },
      } = useForm({
        defaultValues: {
          Name: "",
        },
        mode: "onChange"
      });
    
      const OnSubmit = async(params) =>{
        await dispatch(createType(params));
        dispatch(fetchTypes(typesData.currentPage));
      }
    
    return (
        <>
        <Segment className='w-full'>
            <Header>Add type</Header>
            <Form onSubmit={handleSubmit(OnSubmit)}>
            <FormField className="">
                <label className="text-slate-50">Name:</label>
                <input
                    {...register("Name", {required: "Name is required.", })}
                    className="pl-2 w-full border-2 rounded font-normal"
                    placeholder="number"
                />
            </FormField>
            <div className="flex items-center justify-center">
                <Button 
                    color='pink'
                    type="submit"
                    className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white w-1/2 min-h-6 rounded-lg"
                >
                    Add
                </Button>
            </div>
            </Form>          
        </Segment>
        </>
      );
}

export default TypeCreate;
