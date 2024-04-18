import './PropertyView.css';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { fetchProperties, nextPage, previousPage, removeProperty, updateProperty } from 'MyRedux/slices/Property';
import { createPropertyValue, fetchPropertyValues, resetPage as resetValuePage, nextPage as nextValuePage, previousPage as previousValuePage } from 'MyRedux/slices/PropertyValue';
import { fetchTypes } from 'MyRedux/slices/Type';
import { useForm } from 'react-hook-form';
import TableView from '../../../../Tools/TableView/TableView';
import ModalOfObject from '../../../../Tools/ModalOfObject/ModalOfObject';
import TableVED from '../../../../Tools/TableVED/TableVED';
import DropdownRelation from '../../../../Tools/DropdownRelation/DropdownRelation';
import { Divider, Header } from 'semantic-ui-react';


function PropertyView(props) {
    const propertiesData = props.propertiesData;
    const propertyValuesData = useSelector(state => state.admin.propertyValue);
    const typesData = useSelector(state => state.admin.type);
    const categoriesData = useSelector(state => state.admin.category);


    const [open, setOpen] = React.useState(false)
    const [PropertyId, setId] = React.useState(0);
    const [PropertyName, setName] = React.useState("");
    const [PropertyDescription, setDescription] = React.useState("");
    const [PropertyType, setType] = React.useState();
    const [PropertyCategory, setCategory] = React.useState();
    const [typeId, setTypeId] = React.useState(0)
    const [categoryId, setCategoryId] = React.useState(0)

    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(fetchProperties(propertiesData.currentPage));
        dispatch(fetchTypes())
    },[dispatch, propertiesData.currentPage])
    
    React.useEffect(()=> {
      dispatch(fetchPropertyValues({page: propertyValuesData.currentPage, id:PropertyId}))
    }, [dispatch, propertyValuesData.currentPage, PropertyId])


    const propertyFields = [
        {
            name:"Name",
            options:{required: "Name is required.", },
            placeholder:"number"
        },
        {
            name:"Description",
            options:{required: "Description is required.", },
            placeholder:""
        },
    ]

    const propertyCreateForm = useForm({
        defaultValues: {
            id: 0,
            Name: "",
            Description: "",
        },
        values:{
            id: PropertyId,
            Name: PropertyName,
            Description: PropertyDescription,
        },
        mode: "onChange"
      });
    
      const OnPropertySubmit = async(params) =>{
        console.log(params)
        await dispatch(updateProperty({...params, type:typeId, category:categoryId}));
        dispatch(fetchProperties(propertiesData.currentPage));
        setOpen(false);
      }

      const onRowClick = async(Property)=>{
        setId(Property.id);
        setName(Property.Name);
        setDescription(Property.Description);
        setType(Property.type);
        setCategory(Property.category);
        setOpen(true);
        await dispatch(resetValuePage())
      }

      const onLeftArrClick = ()=>{
        dispatch(previousPage());
      }
      const onRightArrClick = ()=>{
        dispatch(nextPage());
      }

    const propertyValueCreateForm = useForm({
      defaultValues: {
          id: 0,
          Value: "",
      },
  
      mode: "onChange"
    });
  
    const propertyValueFields = [
      {
        name:"id",
        options:{required: "Id is required.", },
      },
      {
          name:"Value",
          options:{required: "Value is required.", },
          placeholder:""
      },
    ]
    const OnPropertyValueSubmit = async(params) =>{
      const p ={
        id: PropertyId,
        value: params.Value
      }
      await dispatch(createPropertyValue(p))
      dispatch(fetchPropertyValues({page: propertyValuesData.currentPage, id:PropertyId}))
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

    return(
        <>
            <TableView 
                Tittle="Характеристики"
                ColumnsTittle={["id", "Назва", "Категорія"]}
                ColumnsKeys={["id", "Name", "category"]}
                dataToView={propertiesData.properties?.data}
                onRowClick={onRowClick}
                onLeftArrClick={onLeftArrClick}
                onRightArrClick={onRightArrClick}
                currentPage={propertiesData?.currentPage}
                isLastPage={propertiesData?.properties && Boolean(propertiesData?.properties?.data.length)}
                uniqueKey="properties"
            />
            <ModalOfObject
                Tittle="Редагування характеристики"
                fields={propertyFields}
                onModalClose={() => setOpen(false)}
                onModalOpen={() => setOpen(true)}
                stateOfModal={open}
                onSubmit={propertyCreateForm.handleSubmit(OnPropertySubmit)}
                register={propertyCreateForm.register}
                onTrashClick={async() => {
                    await dispatch(removeProperty(PropertyId));
                    dispatch(fetchProperties(propertiesData.currentPage));
                    setOpen(false);}}
                addBottom ={
                  <>
                  <Divider />
                  <Header>Relations</Header>
                  <DropdownRelation
                    Tittle={"Тип даних характеристики"}
                    dataToView={typesData.types?.data}
                    defaultValue={PropertyType?.Name}
                    dataKeys = {{key:"id", value:"Name", text:"Name"}}
                    onChange = {onTypeChange}
                  />
                  <DropdownRelation
                    Tittle={"Категорія"}
                    dataToView={categoriesData.categories?.data}
                    defaultValue={PropertyCategory?.Name}
                    dataKeys = {{key:"id", value:"Name", text:"Name"}}
                    onChange = {onCategoryChange}
                  />
                  <TableVED 
                    Tittle={"Значення характеристик"}
                    ColumnsTittle={["id", "Value"]}
                    ColumnsKeys={["propertyValueId", "value"]}
                    fields={propertyValueFields}
                    register={propertyValueCreateForm.register}
                    onSubmit={propertyValueCreateForm.handleSubmit(OnPropertyValueSubmit)}
                    dataToView={propertyValuesData.propertyValues?.data}
                    currentPage={propertyValuesData?.currentPage}
                    isLastPage={propertyValuesData?.propertyValues && Boolean(propertyValuesData?.propertyValues?.data.length)}
                    onLeftArrClick={() => {  dispatch(previousValuePage());}}
                    onRightArrClick={() => { dispatch(nextValuePage())}}
                    uniqueKey = "propertyValues"
                  />
                </>
                }
            />
        </>
    );
}

export default PropertyView;
