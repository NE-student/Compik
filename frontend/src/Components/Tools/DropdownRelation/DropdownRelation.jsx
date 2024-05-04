
import { Button, Dropdown, Header} from 'semantic-ui-react';
import './DropdownRelation.css';

import React from 'react';



function DropdownRelation(props) {
    
    const [currentValue, setCurrentValue] = React.useState("")

    const Tittle = props.Tittle;
    const data = props.dataToView;
    const dataKeys = props.dataKeys;
    const defaultValue = props.defaultValue;
    const onChange = props.onChange;
    const onClickCreate = props.onClickCreate
    
    const dropdownOptions = [];
    if(data){
        data.forEach( (obj) =>{
            const newObj = {
                key: obj[dataKeys.key],
                text: obj[dataKeys.text],
                value: obj[dataKeys.value]
            }
            dropdownOptions.push(newObj);
        }
        );
    }

    const onSearchChange = (_, data)=>{
        setCurrentValue(data.searchQuery)
    }

    return (
        <>
            <Header as="h4">{Tittle}</Header>
            {data && 
            <Dropdown
            
                fluid
                search
                selection
                options={dropdownOptions}
                defaultValue={defaultValue}
                onChange={onChange}
                onSearchChange = {onSearchChange}
                noResultsMessage={<div><Button onClick={()=> onClickCreate(currentValue)}> Створити </Button> новий елемент? Значення: {currentValue} </div>}
            />
            }
        </>
      );
}

export default DropdownRelation;
