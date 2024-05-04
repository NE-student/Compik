import {
  Segment,
  TableCell,
  ListItem,
  ListContent,
  List,
  TransitionGroup,
} from "semantic-ui-react";
import "./ListView.css";

import React from "react";

function ListView(props) {

  const ColumnsKeys = props.ColumnsKeys;
  const data = props.data;
  const uniqueKey = props.uniqueKey;

  const createRows = (obj, index) => {
    const rows = [];
    ColumnsKeys.forEach((key) => {
      if (!obj[key]) return;
      rows.push(
        <TableCell key={uniqueKey + key + obj[key]}>{obj[key]}</TableCell>
      );
    });
    return rows;
  };

  return (
    <Segment>
      <TransitionGroup
        as={List}
        duration={200}
        divided
        size="huge"
        verticalAlign="middle"
      >
        {Boolean(data) &&
          data.map((obj, index) => {
            return (
              <ListItem>
                <ListContent key={uniqueKey + index}>
                  {createRows(obj, index)}
                </ListContent>
              </ListItem>
            );
          })}
      </TransitionGroup>
    </Segment>
  );
}

export default ListView;
