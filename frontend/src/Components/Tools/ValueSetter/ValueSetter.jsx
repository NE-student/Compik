import "./ValueSetter.css";
import React from "react";
import DropdownRelation from "../DropdownRelation/DropdownRelation";
import { Button, Checkbox, Input } from "semantic-ui-react";

function ValueSetter(props) {
  const header = props.header;
  const values = props.values;
  const dataKeys = props.dataKeys;
  const onValueChange = props.onValueChange;
  const onClickCreate = props.onClickCreate;
  const type = props.type;
  const defaultValue = props.defaultValue;
  const counted = props.counted;
  const defaultCountValue = props.defaultCountValue;

  const [state, setState] = React.useState({
    event: null,
    data: { value: defaultValue, checked: defaultValue },
    count: 1,
  });

  return (
    <div className="flex flex-row w-full border-t border-gray items-center">

    <div className="w-full flex flex-col  p-3 justify-center">
      <div className=" w-full">
        {header}:{" "}
        {type === "boolean" && (
          <Checkbox
            onChange={(event, data) => {
              setState({ event, data, count: state.count });
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
              setState({ event, data, count: state.count });
            }}
            onClickCreate={onClickCreate}
          />
        </div>
      )}
      {counted && (
        <Input
          type="number"
          defaultValue={defaultCountValue}
          min={1}
          onChange={(e) => setState({ event:state.event, data:state.data, count: +e.target.value })}
        />
      )}
      
    </div>
    {counted && <Button className=" h-1/2" icon="check" onClick={() => onValueChange(state.event, state.data, state.count)}></Button>}
    </div>
  );
}

export default ValueSetter;
