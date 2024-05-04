import { Header, Input } from "semantic-ui-react";
import "./Filters.css";
import Slider from "Components/Tools/Slider/Slider";
import Filter from "./Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchComponents, setMaxPrice, setMinPrice } from "MyRedux/slices/Configuration";

function Filters(props) {
  const currentCategory = useSelector(
    (state) => state.configuration.currentCategory
  );
  const categories = useSelector((state) => state.configuration.categories?.data)
  const categoryName = categories?.find((element) => element.id == currentCategory)?.Name || ""
  const filters = useSelector(state => state.configuration.filters)
  const properties = useSelector(state => state.configuration.properties)
  const compareProperties = useSelector(state => state.configuration.compareProperties)

  const dispatch = useDispatch();

  const  propertiesFilters = Object.keys(filters?.properties).map((element) => { return +element }) || []
  const comparePropertiesFilters = Object.keys(filters?.compareProperties).map((element) => { return +element }) || []

  let data = [];
  if(properties){
    data =data.concat(properties.map((element)=>{
      let defaultValue;
      if(propertiesFilters.includes(element.id)){
        const id = filters["properties"][String(element.id)]
        defaultValue = element.values.find((item) =>item.id == id)
      }
      return <Filter defaultValue={defaultValue} filters={filters} property={element} type="properties" />
    }));
  }
  if(compareProperties){
    data = data.concat(compareProperties.map((element)=>{
      let defaultValue;
      if(comparePropertiesFilters.includes(element.id)){
        const id = filters["compareProperties"][String(element.id)]
        defaultValue = element.values.find((item) =>item.id == id)

      }
      return <Filter defaultValue={defaultValue} filters={filters} property={element} type="compareProperties" />
    }));
  }

  return (
    <>
    {currentCategory &&
    <div className=" flex flex-col items-center overflow-auto h-full max-h-[55rem] max-w-[30rem] bg-second rounded-lg border-border1 border space-y-4">
      <div className=" w-full bg-white p-4 rounded-lg">
        <Header as="h2">{categoryName}</Header>
        <div className="grid grid-cols-3 w-full gap-2">
          <Input type="search" className=" col-span-2" placeholder="..." />
          <button className=" w-full justify-self-end bg-accent px-5 py-1 rounded text-white" onClick={async() => dispatch(fetchComponents({category: currentCategory, filters: filters}))}>
            Пошук
          </button>
        </div>
      </div>
      <div className=" w-full text-left bg-white p-4 rounded-lg">
        <Header as="h3">Цiна</Header>
        <Slider minNumber={[filters.price.minNumber, (value) => dispatch(setMinPrice(value))]} maxNumber={[filters.price.maxNumber, (value) => dispatch(setMaxPrice(value))]} />
      </div>
      <div className=" w-full h-1/2 flex flex-col  space-y-2">
        {data}
      </div>
    </div>
    }
    </>
  );
}

export default Filters;
