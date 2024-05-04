import './Grider.css';
import React from 'react';
import { Grid, GridColumn, GridRow, TransitionGroup } from 'semantic-ui-react';


function Grider(props) {
    
    const elements = props.elements;
    
    const rows = props.rows;
    const columns = props.columns;


    const createGridColumn = function(item){
        return(
            <TransitionGroup as={GridColumn} duration={200}>{item}</TransitionGroup>
        )
    }
    const createGridRow = function(cols){
        return(
            <TransitionGroup as={GridRow} duration={200}>{cols}</TransitionGroup>
        )
    }
    
    const createGrid = function(){
        let gridRows = []
        let gridColumns = []

        let k = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if(!elements || !elements[k]) break
                gridColumns.push(createGridColumn(elements[k]))
                k++;
            }
            gridRows.push(createGridRow(gridColumns));
            gridColumns = []
            if(!elements || !elements[k]) break
        }
        return (
            <TransitionGroup as={Grid} duration={200} stretched columns={columns}>{gridRows}</TransitionGroup>
        )
    }

    return (
        createGrid()
      );
}

export default Grider;
