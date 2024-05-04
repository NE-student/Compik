import { useDispatch } from "react-redux";
import "./Filter.css";
import ValueSelector from "Components/Tools/ValueSelector/ValueSelector";
import { addFilter } from "MyRedux/slices/Configuration";

function Filter(props) {
  const property = props.property
  const dispatch = useDispatch();



  const onFilterChange = async(property, data)=>{

    if(!data.options ){
      await dispatch(addFilter({type:props.type, property: property.id, propertyValue: data.checked}))
      return;
    }
    data.options.forEach(async(item) => {
      if (item.value === data.value) {
          await dispatch(addFilter({type:props.type, property: property.id, propertyValue:item.key}))
        return;
      }
    });
  }

  


  return (
    <ValueSelector
      header={property.Name}
      values={property.values}
      type={property.type.Name}
      dataKeys={{ key: "id", value: "value", text: "value" }}
      onValueChange={(_, data) => onFilterChange(property, data)}
      defaultCountValue={1}
      counted={false}
      defaultValue={props.defaultValue}
    />

  );
}

export default Filter;
