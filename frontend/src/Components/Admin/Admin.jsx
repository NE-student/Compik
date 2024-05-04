import {
  Button,
  Container,
  Divider,
  Header,
  Menu,
  MenuItem,
  Segment,
} from "semantic-ui-react";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentAdminMenu, switchMenu } from "MyRedux/slices/Admin";
import React from "react";
import General from "./MenuItems/General/General";
import Properties from "./MenuItems/Properties/Property";
import Component from "./MenuItems/Components/Component";
import CompareProperties from "./MenuItems/CompareProperties/CompareProperties";

const generalMenu = "general";
const componentMenu = "component";
const propertyMenu = "property";
const comparePropertyMenu = "comparePropertyMenu";

function Admin() {
  const currentAdminMenu = useSelector(selectCurrentAdminMenu);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  if (!userData?.isAdmin) {
    return (
      <div className="flex-auto flex p-4">
        <Container className=" h-fit text-center">
          <Header>У вас немає доступу!</Header>
          <Divider />
          <Link to="/">
            <Button color="black">Повернутись на головну сторінку.</Button>
          </Link>
        </Container>
      </div>
    );
  }

  const renderSwitch = (name) => {
    switch (name) {
      case generalMenu:
        return <General />;
      case propertyMenu:
        return <Properties />;
      case componentMenu:
        return <Component />;
      case comparePropertyMenu:
        return <CompareProperties />;
      default:
        return <General />;
    }
  };

  const handleItemClick = (e, { name }) => dispatch(switchMenu(name));

  return (
    <div className="flex-auto py-9 px-16 bg-white justify-center font-medium rounded-sm">
      <Menu attached="top" tabular>
        <MenuItem
          name={generalMenu}
          active={currentAdminMenu === generalMenu}
          onClick={handleItemClick}
        >
          Головна
        </MenuItem>
        <MenuItem
          name={componentMenu}
          active={currentAdminMenu === componentMenu}
          onClick={handleItemClick}
        >
          Комплектуючі
        </MenuItem>
        <MenuItem
          name={propertyMenu}
          active={currentAdminMenu === propertyMenu}
          onClick={handleItemClick}
        >
          Характеристики
        </MenuItem>
        <MenuItem
          name={comparePropertyMenu}
          active={currentAdminMenu === comparePropertyMenu}
          onClick={handleItemClick}
        >
          Порiвнюванi характеристики
        </MenuItem>
      </Menu>
      <Segment attached="bottom">{renderSwitch(currentAdminMenu)}</Segment>
    </div>
  );
}

export default Admin;
