import { Button, Container, Divider, Header, Menu, MenuItem, Segment} from 'semantic-ui-react';
import './Admin.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { selectCurrentAdminMenu, switchMenu } from '../../redux/slices/Admin';
import React from 'react';
import General from './MenuItems/General/General';
import Properties from './MenuItems/Properties/Property';

const generalMenu = "general"
const propertyMenu = "property"

function Admin() {
    const currentAdminMenu = useSelector(selectCurrentAdminMenu);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);

    if(!userData?.isAdmin){
        return (
            <Container className=' text-center'>
                <Header>У вас немає доступу!</Header>
                <Divider />
                <Link to="/">
                    <Button color="black">Повернутись на головну сторінку.</Button>
                </Link>
            </Container>
        );
    }

    
    
    const renderSwitch = (name)=>{
        switch(name){
            case generalMenu:
                return <General />
            case propertyMenu:
                return <Properties />
            default:
                return <General />
        }
    }
    
    const handleItemClick = (e, { name }) => dispatch(switchMenu(name));

    return (
        <div className="py-9 min-w-96 w-3/4 px-16 bg-white grid gap-4 grid-cols-1 font-medium content-center rounded-sm">
            <div>
                <Menu attached='top' tabular>
                    <MenuItem
                    name={generalMenu}
                    active={currentAdminMenu === generalMenu}
                    onClick={handleItemClick}
                    >
                        Головна
                    </MenuItem>
                    <MenuItem
                    name={propertyMenu}
                    active={currentAdminMenu === propertyMenu}
                    onClick={handleItemClick}
                    >
                        Характеристики
                    </MenuItem>
                </Menu>
                <Segment attached='bottom'>
                    {renderSwitch(currentAdminMenu)}
                </Segment>
            </div>
        </div>
    );
}

export default Admin;
