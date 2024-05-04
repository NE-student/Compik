import {
  Form,
  Button,
  Header,
  Icon,
  Menu,
  MenuItem,
  Segment,
  TableCell,
  ListItem,
  ListContent,
  List,
  TransitionGroup,
} from "semantic-ui-react";
import "./FormVED.css";

import React from "react";
import ListView from "../ListView/ListView";

function FormVED(props) {

  const Tittle = props.Tittle;
  const ColumnsKeys = props.ColumnsKeys;
  const data = props.dataToView;
  const onLeftArrClick = props.onLeftArrClick;
  const onRightArrClick = props.onRightArrClick;
  const currentPage = props.currentPage;
  const isLastPage = props.isLastPage;
  const register = props.register;
  const fields = props.fields;
  const onSubmit = props.onSubmit;
  const uniqueKey = props.uniqueKey;

  const createRows = (obj, index) => {
    const rows = [];
    ColumnsKeys.forEach((key)=>{
      if(!obj[key]) return;
      rows.push(<TableCell key={uniqueKey + key + obj[key]}>{obj[key]}</TableCell>);
    })
    return rows;
  };


  return (
    <>
      <Segment className="w-full">
        <Header as="h4">{Tittle}</Header>

        <>
        <Form onSubmit={onSubmit} className="flex flex-row">
            {fields &&
              fields.map((field, index) => {
                if (field.name === "id") {
                  return;
                }
                return (
                  <input
                    key={uniqueKey + index * 5}
                    {...register(field.name, field.options)}
                    placeholder={field.placeholder}
                    className="w-full h-12"
                  ></input>
                );
              })}

            <Button type="submit">Add</Button>
            <Menu floated="right" pagination>
              <MenuItem as="a" icon onClick={() => onLeftArrClick()}>
                <Icon name="chevron left" />
              </MenuItem>
              <MenuItem as="a">{currentPage}</MenuItem>

              {isLastPage && (
                <MenuItem as="a" icon onClick={() => onRightArrClick()}>
                  <Icon name="chevron right" />
                </MenuItem>
              )}
            </Menu>
          </Form>
        </>
        <ListView 
          ColumnsKeys = {ColumnsKeys}
          data = {data}
          uniqueKey = {uniqueKey}
        />
        
      </Segment>
    </>
  );
}

export default FormVED;
