import { useDispatch, useSelector } from "react-redux";
import Component from "./Component/Component";
import "./Components.css";
import { addComponent } from "MyRedux/slices/Configuration";

function Components(props) {
  const components = useSelector(
    (state) => state.configuration.components?.data
  );
  const dispatch = useDispatch();
  let data;
  if (components) {
    data = components.map((element) => {
      let properties;
      if (element?.properties) {
        properties = element.properties.map((p) => {
          let obj = { Name: null, value: null };
          obj.Name = p.property.Name;
          obj.value = p.value?.value || p.boolValue;
          return obj;
        });
      }
      if (element?.compareProperties) {
        properties = properties.concat(
          element.compareProperties.map((p) => {
            let obj = { Name: null, value: null };
            obj.Name = p.property.Name;
            obj.value = p.value?.value || p.boolValue;
            obj.Description = p.property.Description;
            return obj;
          })
        );
      }
      return (
        <Component
          onClick={async () => {
            dispatch(
              addComponent({
                category: props.currentCategory,
                component: element,
              })
            );
          }}
          Name={element.Name}
          img={element.Photos[0]}
          Price={element.Price}
          properties={properties}
        />
      );
    });
  }
  return (
    <div className=" w-full max-h-[60rem] flex flex-col space-y-1 overflow-auto">
      {data}
    </div>
  );
}

export default Components;
