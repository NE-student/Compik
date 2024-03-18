import { Button, Container, Divider, Header, Icon, Menu, MenuItem, Segment, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './Admin.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { selectCurrentAdminMenu, switchMenu } from '../../redux/slices/Admin';
import { fetchTypes, nextPage, previousPage } from '../../redux/slices/Type';
import React from 'react';
import Types from './MenuItems/Types/Types';
import General from './MenuItems/General/General';

const generalMenu = "general"
const typeMenu = "type"

function Admin() {
    const currentAdminMenu = useSelector(selectCurrentAdminMenu);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);

    if(!userData?.isAdmin){
        return (
            <Container>
                <Header>Access denied!</Header>
                <Divider />
                <Link to="/">
                    <Button basic color="black">Return</Button>
                </Link>
            </Container>
        );
    }

    
    
    const renderSwitch = (name)=>{
        switch(name){
            case generalMenu:
                return <General />
            case typeMenu:
                return <Types />
            default:
                return <General />
        }
    }
    
    const handleItemClick = (e, { name }) => dispatch(switchMenu(name));

    return (
        <div className="py-9 min-w-96 w-3/4 px-16 bg-white grid gap-4 grid-cols-1 font-medium content-center rounded-sm">
            <div className='grid gap-4 grid-cols-1'>
                <Header className='text-slate-50 text-3xl text-center font-sans'>Edit</Header>
                <Divider />
            </div>
            <div>
                <Menu attached='top' tabular>
                    <MenuItem
                    name={generalMenu}
                    active={currentAdminMenu === generalMenu}
                    onClick={handleItemClick}
                    >
                        General
                    </MenuItem>
                    <MenuItem
                    name={typeMenu}
                    active={currentAdminMenu === typeMenu}
                    onClick={handleItemClick}
                    >
                        Types
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
