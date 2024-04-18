import { Button, Form, FormField, Header, Segment} from 'semantic-ui-react';
import './PropertyCreate.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProperty, fetchProperties } from 'MyRedux/slices/Property';
import DropdownRelation from '../../../../Tools/DropdownRelation/DropdownRelation'
import { fetchTypes } from 'MyRedux/slices/Type';
import { fetchCategories } from 'MyRedux/slices/Category';



function PropertyCreate(props) {
    const propertiesData = props.propertiesData;
    const typesData = useSelector(state => state.admin.type);
    const categoriesData = useSelector(state => state.admin.category);
    const [typeId, setTypeId] = React.useState(0)
    const [categoryId, setCategoryId] = React.useState(0)

    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(fetchTypes())
        dispatch(fetchCategories())
    },[dispatch, propertiesData.currentPage])

    const {
        register,
        handleSubmit,
        // setError,
        // formState: { errors, isValid },
      } = useForm({
        defaultValues: {
          Name: "",
          Description: "",
        },
        mode: "onChange"
      });
    
    const OnSubmit = async(params) =>{
    await dispatch(createProperty({...params, type:typeId, category:categoryId}));
    dispatch(fetchProperties(propertiesData.currentPage));
    }
    
    const onTypeChange = async(_, data) =>{
        data.options.forEach((item)=>{
          if(item.value === data.value){
            setTypeId(item.key)
            return;
          }
        })
      }
    const onCategoryChange = async(_, data) =>{
        data.options.forEach((item)=>{
          if(item.value === data.value){
            setCategoryId(item.key)
            return;
          }
        })
    }

    return (
        <>
        <Segment className='w-full'>
            <Header>Додавання характерстики</Header>
            <Form onSubmit={handleSubmit(OnSubmit)}>
            <FormField>
                <label className="text-slate-50">Ім'я:</label>
                <input
                    autoFocus
                    {...register("Name", {required: "Name is required.", })}
                    className="pl-2 w-full border-2 rounded font-normal"
                    placeholder="Сокет"
                />
            </FormField>
            <FormField>
                <label className="text-slate-50">Опис:</label>
                <textarea
                    {...register("Description", {required: "Description is required.", })}
                    className="pl-2 w-full border-2 rounded font-normal"
                />
            </FormField>
            <DropdownRelation
                    Tittle={"Тип даних характеристики"}
                    dataToView={typesData.types?.data}
                    // defaultValue={PropertyType?.Name}
                    dataKeys = {{key:"id", value:"Name", text:"Name"}}
                    onChange = {onTypeChange}
                  />
            <DropdownRelation
                    Tittle={"Категорія"}
                    dataToView={categoriesData.categories?.data}
                    // defaultValue={PropertyType?.Name}
                    dataKeys = {{key:"id", value:"Name", text:"Name"}}
                    onChange = {onCategoryChange}
                  />
            <div className="flex items-center justify-center mt-5">
                <Button 
                    color='pink'
                    Property="submit"
                    className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white w-1/2 min-h-6 rounded-lg"
                >
                    Додати
                </Button>
            </div>
            </Form>          
        </Segment>
        </>
      );
}

export default PropertyCreate;
