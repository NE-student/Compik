import { useSelector } from "react-redux";
import "./Configuration.css";
import React from "react";
import { Header } from "semantic-ui-react";

function Configuration(props) {
  const Name = props.Name;
  const Description = props.Description;
  const Length = props.length;
  const Price = props.price;

  return (
    <div className=" bg-primary text-white  p-4 rounded-lg border-accent border w-1/2 justify-self-center">
      <div>Ім'я: {Name}</div>
      <div className=" truncate">Опис: {Description}</div>
      <div>Комплеткуючих: {Length}</div>
      <div>Ціна: {Price} грн.</div>
    </div>
  );
}

export default Configuration;
