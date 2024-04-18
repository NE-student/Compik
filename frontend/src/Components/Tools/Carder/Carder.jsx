import './Carder.css';
import React from 'react';
import { Card, CardContent, Header, Icon, Image } from 'semantic-ui-react';


function Carder(props) {
    
    const header = props.header
    const image = props.image
    const onClick = props.onClick
    const icon = props.icon
    const color = props.color

    return (
        <Card color={color} className=' p-3 ' centered onClick={onClick}>
            <Image src={image}  ui={false} />
            <CardContent centered className='flex items-center justify-center'>
            <Header centered textAlign='center'>{header}</Header>
                <Icon color={color} fluid size="big" name={icon} wrapped ui={false} />
            </CardContent>
        </Card>
      );
}

export default Carder;
