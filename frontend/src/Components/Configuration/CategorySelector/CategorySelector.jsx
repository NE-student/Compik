import { useDispatch, useSelector } from "react-redux";
import "./CategorySelector.css";
import Components from "./Components/Components";
import React from "react";
import Category from "./Category/Category";
import { fetchCountByComponents, setCategory } from "MyRedux/slices/Configuration";
import { fetchComponents } from "MyRedux/slices/Configuration";

function CategorySelector() {
  const data = useSelector((state) => state.configuration.categories?.data);
  const filters = useSelector((state) => state.configuration.filters)
  const configurationComponents = useSelector((state) => state.configuration.configurationComponents)
  const count = useSelector((state) => state.configuration.count)
  const currentCategory = useSelector(
    (state) => state.configuration.currentCategory
  );
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(fetchComponents({category: currentCategory, filters:filters, components: Object.values(configurationComponents).map((component)=>{ return component.id})}));
    dispatch(fetchCountByComponents({components: Object.values(configurationComponents).map((component)=>{ return component.id})}))
  }, [currentCategory, filters, configurationComponents, dispatch])

  let renderData;
  if (data) {
    renderData = data.map((element) => {
      const Name = configurationComponents[element?.id]?.Name || element.Name
      const Photos = configurationComponents[element?.id]?.Photos[0] || element.Photos;

      return (
        <Category
          id={element.id}
          Name={Name}
          Photos={Photos}
          exist={configurationComponents[element?.id]}
          count = {count?.data[element?.id] || 0}
          onClick={async(id) => {
            await dispatch(setCategory(id))
            
          }}
        />
      );
    });
  }

  return (
    <div className=" flex-auto flex flex-col h-fit bg-bg4 rounded-lg border-border1 border space-y-10 items-center py-2">
      <div className=" flex flex-row overflow-auto bg-white  rounded-lg">
        {renderData}
      </div>
      {currentCategory && <Components currentCategory={currentCategory} />}
    </div>
  );
}

export default CategorySelector;
