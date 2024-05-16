import { useSelector } from "react-redux";
import "./Profile.css";
import React from "react";
import { Header } from "semantic-ui-react";
import Configuration from "./Configuration/Configuration";

function Profile() {
  const profile = useSelector((state) => state.auth.user);
  let configurations;
  if (profile?.configurations) {
    configurations = profile.configurations.map((configuration)=>{
        const price = configuration.components.reduce((accumulator, currentValue) => {
            return (+accumulator) + (+currentValue.Price)
          },0);
        return <Configuration Name={configuration.Name} Description={configuration.Description} length={configuration.components.length} price={price} />
    });
  }
  return (
    <div className=" bg-white p-6 my-4 mx-auto rounded-lg w-1/2 grow flex flex-col space-y-4 overflow-auto">
      <div className=" flex flex-row items-center space-x-4">
        <div className=" size-16 bg-gray rounded-full"></div>
        <div>
          <div>Nickname: {profile?.Nickname}</div>
          <div>email: {profile?.email}</div>
        </div>
      </div>
      <div className=" bg-third text-white rounded-sm p-4 grid grid-flow-row gap-4">
        <h1 className=" justify-self-center text-xl"> Конфігурації </h1>
        <div className=" grid grid-cols-3">
            {configurations}
        </div>
      </div>
    </div>
  );
}

export default Profile;
