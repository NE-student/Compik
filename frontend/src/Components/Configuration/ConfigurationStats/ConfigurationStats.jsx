import { useDispatch, useSelector } from "react-redux";
import "./ConfigurationStats.css";
import ModalOfObject from "Components/Tools/ModalOfObject/ModalOfObject";
import React from "react";
import { useForm } from "react-hook-form";
import Component from "./Component/Component";
import { Divider, Header } from "semantic-ui-react";
import { saveConfiguration } from "MyRedux/slices/Configuration";

function ConfigurationStats() {
  const configurationComponents = useSelector((state) => state.configuration.configurationComponents);
  const dispatch = useDispatch();
  const price = Object.values(configurationComponents).reduce((accumulator, currentValue) => {
    return (+accumulator) + (+currentValue.Price)
  },0);
  const [open, setOpen] = React.useState(false);
  const configurationFields = [
    {
      name: "Name",
      options: { required: "Name is required." },
      placeholder: "configuration name",
    },
    {
      name: "Description",
      options: { required: "Description is required." },
      placeholder: "",
    },
  ];
  const configurationCreateForm = useForm({
    defaultValues: {
      Name: "",
      Description: "",
    },
    mode: "onChange",
  });
  const OnConfigurationSubmit = async (params) => {
    await dispatch(saveConfiguration({...params, components: Object.values(configurationComponents).map((component)=>{ return component.id})}))
    setOpen(false);
  };

  const data = Object.values(configurationComponents).map((element) => {
    let properties;
    if (element.properties) {
      properties = element.properties.map((p) => {
        let obj = { Name: null, value: null };
        obj.Name = p.property.Name;
        obj.value = p.value?.value || p.boolValue;
        return obj;
      });
    }
    if (element.compareProperties) {
      properties = properties.concat(
        element.compareProperties.map((p) => {
          let obj = { Name: null, value: null };
          obj.Name = p.property.Name;
          obj.value = p.value?.value || p.boolValue;
          return obj;
        })
      );
    }
    return (
      <Component
        Name={element.Name}
        img={element.Photos[0]}
        Price={element.Price}
        properties={properties}
      />)});
  
  return (
    <>
      {configurationComponents &&  Object.keys(configurationComponents).length >= 1 &&( //
        <div className=" flex flex-col justify-items-center">
          <div className="flex flex-col items-center min-h-[10rem]  max-w-[20rem] bg-third rounded-lg border-border1 border space-y-4 p-4">
            <h1 className=" text-2xl text-white">Конфігурація:</h1>
            <div className=" text-white text-left w-full text-lg">
              <p>Комплеткуючих: {Object.keys(configurationComponents).length}</p>
              <p>Ціна: {price} грн.</p>
            </div>
            <button onClick={() => setOpen(true)} className=" w-full justify-self-end bg-accent px-5 py-1 rounded text-white">
              Зберегти в профіль
            </button>
          </div>
        </div>
      )}
    <ModalOfObject
        Tittle="Збереження"
        fields={configurationFields}
        onModalClose={() => setOpen(false)}
        onModalOpen={() => setOpen(true)}
        stateOfModal={open}
        onSubmit={configurationCreateForm.handleSubmit(OnConfigurationSubmit)}
        register={configurationCreateForm.register}
        addBottom={<><Divider/><Header>Комплектуючi</Header>{data}<Header as={"h4"}>Загальна ціна: {price} грн.</Header></>}
      />
    </>
  );
}

export default ConfigurationStats;
