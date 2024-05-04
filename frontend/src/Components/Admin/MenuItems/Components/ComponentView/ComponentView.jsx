import "./ComponentView.css";
import React from "react";
import Grider from "Components/Tools/Grider/Grider";
import Carder from "Components/Tools/Carder/Carder";
import { Button, ButtonContent, Divider, Header, Icon, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchComponents } from "MyRedux/slices/Component";


function ComponentView(props) {
  
  const dispatch = useDispatch();
  const componentsData = useSelector(state => state.admin.component)

  const categoriesData = props.categoriesData;
  const currentCategory = props.currentCategory;
  const onBackClick = props.onBackClick;
  const onCategoryClick = props.onCategoryClick;
  const onAddClick = props.onAddClick
  const currentCategoryId = props.currentCategoryId;
  const onComponentClick = props.onComponentClick;

  React.useEffect(() => {
    dispatch(fetchComponents({page: componentsData.currentPage, category: currentCategoryId}));
  }, [dispatch, componentsData.currentPage, currentCategoryId]);


  

  const renderComponents = function(){
    return(
      <Grider
            elements={componentsData.components?.data.map((component, index) => {
              return (
                <Carder
                  onClick={() => onComponentClick(component)}
                  header={component.Name}
                  image={
                    "http://" +
                    process.env.REACT_APP_SERVER_URL +
                    component.Photos[0]
                  }
                />
              );
            })}
            rows={5}
            columns={3}
          />
          
    )
  }

  return (
    <div>
      {currentCategory !== "" && (
        <>
          <Button labelPosition="right" onClick={onBackClick}>
            <ButtonContent>
              <Icon name="angle left" />
            </ButtonContent>
            {currentCategory}
          </Button>
          <Divider />
          <div className=" grid grid-cols-2 p-4 min-h-96">
            <div>
              {
                renderComponents()
                }
              {!componentsData.components &&
              <Segment placeholder textAlign="center">
                <Header>
                  <Icon name="frown" />
                    Не знайдено
                </Header>
              </Segment>
              }
            </div>
            
            <div className=" flex max-h-96">
              <Carder color="blue" onClick={onAddClick} icon="add" header="Додати" />
            </div>
          </div>
        </>
      )}
      <div className=" m-auto max-w-lg">
        {currentCategory === "" && (
          <Grider
            elements={categoriesData.categories?.data.map((category, index) => {
              return (
                <Carder
                  onClick={() => onCategoryClick(category.Name, category.id)}
                  header={category.Name}
                  image={
                    "http://" +
                    process.env.REACT_APP_SERVER_URL +
                    category.Photos
                  }
                />
              );
            })}
            rows={5}
            columns={3}
          />
        )}
      </div>
    </div>
  );
}

export default ComponentView;
