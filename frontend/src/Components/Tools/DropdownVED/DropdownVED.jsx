import {
  Button,
  Header,
  Segment,
  TableCell,
  ListItem,
  ListContent,
  List,
  TransitionGroup,
} from "semantic-ui-react";
import "./DropdownVED.css";

import React from "react";
import DropdownRelation from "../DropdownRelation/DropdownRelation";
import ListView from "../ListView/ListView";



function removeValue(value, array) {
    const index = array.indexOf(value);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
    return array
}




function DropdownVED(props) {

  const Tittle = props.Tittle;
  const ColumnsKeys = props.ColumnsKeys;
  const data = props.dataToView;
  const uniqueKey = props.uniqueKey;
  const DropdownData = props.DropdownData;
  const onDropdownValueChange = props.onDropdownValueChange
  const onDropdownAdd = props.onDropdownAdd
  
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
        <div className=" flex flex-row">
            <DropdownRelation
                        Tittle={Tittle}
                        dataToView={DropdownData}
                        dataKeys = {{key:"id", value:"Name", text:"Name"}}
                        onChange = {onDropdownValueChange}
                    />
            <Button onClick={onDropdownAdd} >Add</Button>
        </div>
        <ListView 
          ColumnsKeys = {ColumnsKeys}
          data = {data}
          uniqueKey = {uniqueKey}
        />
      </Segment>
    </>
  );
}

export default DropdownVED;
