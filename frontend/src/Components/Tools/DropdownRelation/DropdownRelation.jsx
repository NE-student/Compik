
import { Dropdown, Header} from 'semantic-ui-react';
import './DropdownRelation.css';

import React from 'react';



function DropdownRelation(props) {
    
    const Tittle = props.Tittle;
    const data = props.dataToView;
    const dataKeys = props.dataKeys;
    const defaultValue = props.defaultValue;
    
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
            onChange={props.onChange}
            />
            }
        </>
      );
}

export default DropdownRelation;
