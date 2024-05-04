import "./ValueSelector.css";
import React from "react";
import DropdownRelation from "../DropdownRelation/DropdownRelation";
import { Button, Checkbox, Input } from "semantic-ui-react";

function ValueSelector(props) {
  const header = props.header;
  const values = props.values;
  const dataKeys = props.dataKeys;
  const onValueChange = props.onValueChange;
  const onClickCreate = props.onClickCreate;
  const type = props.type;
  const defaultValue = props.defaultValue;



  return (
    <div className="flex flex-row w-full bg-white border-t border-gray items-center text-text1">

    <div className="w-full flex flex-col  p-3 justify-center">
      <div className=" w-full">
        {header}:{" "}
        {type === "boolean" && (
          <Checkbox
            onChange={(event, data) => {
              onValueChange(event, data);
            }}
            defaultChecked={defaultValue}
          />
        )}
      </div>

      {type !== "boolean" && (
        <div className=" w-full">
          <DropdownRelation
            Tittle={""}
            dataToView={values}
            defaultValue={defaultValue}
            dataKeys={dataKeys}
            onChange={(event, data) => {
              onValueChange(event, data);
            }}
            onClickCreate={onClickCreate}
          />
        </div>
      )}
    </div>
    </div>
  );
}

export default ValueSelector;
