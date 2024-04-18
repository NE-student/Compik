import { useSelector } from 'react-redux';
import './Grider.css';
import React from 'react';
import { Card, CardContent, CardHeader, Grid, GridColumn, GridRow } from 'semantic-ui-react';


function Grider(props) {
    
    const elements = props.elements;
    const rows = props.rows;
    const columns = props.columns;

    const createGridColumn = function(item){
        return(
            <GridColumn >{item}</GridColumn>
        )
    }
    const createGridRow = function(cols){
        return(
            <GridRow >{cols}</GridRow>
        )
    }
    
    const createGrid = function(){
        let gridRows = []
        let gridColumns = []

        let k = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if(!elements[k]) break
                gridColumns.push(createGridColumn(elements[k]))
                k++;
            }
            gridRows.push(createGridRow(gridColumns));
            gridColumns = []
            if(!elements[k]) break
        }
        return (
            <Grid stretched columns={columns}>{gridRows}</Grid>
        )
    }

    return (
        createGrid()
      );
}

export default Grider;
