import { useDispatch, useSelector } from "react-redux";
import "./ComponentEdit.css";
import React from "react";
import {
  Button,
  ButtonContent,
  Form,
  FormField,
  Header,
  Icon,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axiosInstance";
import ImageUploader from "Components/Tools/ImageUploader/ImageUploader";
import { changeCompareComponentProperty, changeComponentProperty, fetchComponent, updateComponent } from "MyRedux/slices/Component";
import ValueSetter from "Components/Tools/ValueSetter/ValueSetter";
import Grider from "Components/Tools/Grider/Grider";

function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}

function ComponentEdit(props) {
  const currentComponent = useSelector(
    (state) => state.admin.component.currentComponent
  );
  const currentProperties = useSelector(
    (state) => state.admin.component.currentProperties
  );
  const currentCompareProperties = useSelector(
    (state) => state.admin.component.currentCompareProperties
  );

  const onBackClick = props.onBackClick;
  const onRemoveClick = props.onRemoveClick;
  const [imageURL, setImageUrl] = React.useState(currentComponent?.Photos[0]);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      Name: currentComponent?.Name,
      Description: currentComponent?.Description,
      Price: currentComponent?.Price,
    },
    mode: "onChange",
  });

  const OnSubmit = async (params) => {
    if (!imageURL) {
      alert("Завантажте картинку");
      return;
    }
    await dispatch(
      updateComponent({
        ...params,
        id: currentComponent.id,
        Photos: [imageURL],
      })
    );
    await dispatch(fetchComponent(currentComponent.id))
    
  };

  const onChangeFile = async (e) => {
    if (!isFileImage(e.target.files[0])) {
      alert("Завантажуйте тiльки картинки!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
      alert("Виникла помилка в завантаженi файлу.");
    }
  };

  const onValueChanged = async(property, data) => {
    if(!data.options){
      await dispatch(changeComponentProperty({componentId: currentComponent.id, propertyId: property.id, boolValue: data.checked}))
      return;
    }
    data.options.forEach(async(item) => {
      if (item.value === data.value) {
          await dispatch(changeComponentProperty({componentId: currentComponent.id, propertyId: property.id, propertyValueId: item.key}))
        return;
      }
    });
  };
  const onCompareValueChanged = async(property, data, count) => {
    console.log(count)
    if(!data.options){
      await dispatch(changeCompareComponentProperty({componentId: currentComponent.id, propertyId: property.id, boolValue: data.checked, count:count}))
      return;
    }
    data.options.forEach(async(item) => {
      if (item.value === data.value) {
          await dispatch(changeCompareComponentProperty({componentId: currentComponent.id, propertyId: property.id, propertyValueId: item.key, count:count}))
        return;
      }
    });
  };

  const renderProperties = (componentProperties, properties, onValueChange, counted=false) => {
    return (
      properties &&
      properties.map((property, index) => {
        let row;
        componentProperties?.forEach((currentValue)=>{
          if (currentValue?.property?.Name === property.Name){
            row = <ValueSetter
                header={property.Name}
                values={property.values}
                type={property.type.Name}
                defaultValue={currentValue.value?.value || currentValue.boolValue}
                defaultCountValue = {currentValue.count}
                dataKeys={{ key: "id", value: "value", text: "value" }}
                onValueChange={(_, data, count) => onValueChange(property, data, count)}
                onClickCreate={(value) => console.log(value)}
                counted = {counted && property.isCountable  && property?.category.id === currentComponent?.category.id}
              />;
            
          }
        })
        if (row) return row;
        return (
          <ValueSetter
            header={property.Name}
            values={property.values}
            type={property.type.Name}
            dataKeys={{ key: "id", value: "value", text: "value" }}
            onValueChange={(_, data, count) => onValueChange(property, data, count)}
            onClickCreate={(value) => console.log(value)}
            defaultCountValue = {1}
            counted = {counted && property.isCountable && property?.category.id === currentComponent?.category.id}
          />
        );
      }
    ));
  };

  const properties = renderProperties(currentComponent?.properties, currentProperties, onValueChanged);
  const compareProperties = renderProperties(currentComponent?.compareProperties, currentCompareProperties, onCompareValueChanged, true);

  return (
    <div>
      <div className="flex w-full items-center">
        <Button
          className=" basis-1/5"
          labelPosition="right"
          onClick={onBackClick}
        >
          <ButtonContent>
            <Icon name="angle left" />
          </ButtonContent>
          Повернутись
        </Button>
        <div className=" basis-4/5 text-right">
          <Button
            color="pink"
            Property="submit"
            className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white min-h-6 rounded-lg"
            onClick={handleSubmit(OnSubmit)}
          >
            Зберегти
          </Button>
          <Button
            onClick={() => onRemoveClick(currentComponent)}
            color="grey"
            icon="trash"
          >
            Видалити
          </Button>
        </div>
      </div>

      <ImageUploader onChangeFile={onChangeFile} imageURL={imageURL} />
      <Form>
        <FormField>
          <label className="text-slate-50">Навза:</label>
          <input
            autoFocus
            {...register("Name", { required: "Name is required." })}
            className="pl-2 w-full border-2 rounded font-normal"
          />
        </FormField>
        <FormField>
          <label className="text-slate-50">Цiна:</label>
          <input
            {...register("Price", { required: "Price is required." })}
            className="pl-2 w-full border-2 rounded font-normal"
            type="number"
            min="1"
            step="any"
          />
        </FormField>
        <FormField>
          <label className="text-slate-50">Опис:</label>
          <textarea
            {...register("Description", {
              required: "Description is required.",
            })}
            className="pl-2 w-full border-2 rounded font-normal"
          />
        </FormField>
      </Form>
      {compareProperties && (
        <>
          <Header>Порiвнюванi характеристики</Header>
          <Grider
            elements={compareProperties}
            columns={3}
            rows={compareProperties.length / 3}
          />
        </>
      )}
      {properties && (
        <>
          <Header>Звичайнi характеристики</Header>
          <Grider
            elements={properties}
            columns={3}
            rows={properties.length / 3}
          />
        </>
      )}
      
    </div>
  );
}

export default ComponentEdit;
