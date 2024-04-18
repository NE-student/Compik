import { useDispatch, useSelector } from "react-redux";
import "./Component.css";
import React from "react";
import { fetchCategories } from "MyRedux/slices/Category";
import ComponentView from "./ComponentView/ComponentView";
import ComponentCreate from "./ComponentCreate/ComponentCreate";
import ComponentEdit from "./ComponentEdit/ComponentEdit";
import { fetchComponent, removeComponent } from "MyRedux/slices/Component";

const viewState = "view";
const addState = "add";
const editState = "edit";

function Component() {
  const categoriesData = useSelector((state) => state.admin.category);

  const [currentCategory, setCategory] = React.useState("");
  const [currentCategoryId, setCategoryId] = React.useState();
  const [currentState, setState] = React.useState(viewState);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onComponentClick = async(component)=>{
    await dispatch(fetchComponent(component.id))
    setState(editState)
  }

  const renderSwitch = (name)=>{
    switch(name){
        case viewState:
            return (
            <ComponentView 
                categoriesData = {categoriesData}
                currentCategory = {currentCategory}
                currentCategoryId = {currentCategoryId}
                onBackClick = {() => setCategory("")}
                onCategoryClick = {(category, id) => {setCategory(category); setCategoryId(id)}}
                onComponentClick = {(component) => onComponentClick(component)}
                onAddClick = {() => setState(addState)}
            />)
        case addState:
            return (
                <ComponentCreate
                currentCategoryId = {currentCategoryId}
                onBackClick = {() => setState(viewState)}
                onCreate = {() => setState(editState)}
                />
            )
        case editState:
          return(
            <ComponentEdit
                currentCategoryId = {currentCategoryId}
                onBackClick = {() => setState(viewState)}
                onRemoveClick = {async(component) => { await dispatch(removeComponent(component.id)); setState(viewState)}}
            />
          )
        default:
            return (<ComponentView 
            categoriesData = {categoriesData}
            currentCategory = {currentCategory}
            onBackClick = {() => setCategory("")}
            onCategoryClick = {(category, id) => {setCategory(category); setCategoryId(id)}}
            onAddClick = {() => setState(addState)}
        />)
    }
}

  return (
    <div>
        {renderSwitch(currentState)}
    </div>
  );
}

export default Component;
