import { useState } from "react";
import "./Component.css";

function Component(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className=" text-text4 bg-white w-full p-2 grid grid-flow-col items-center hover:bg-second"
      >
        <div className="flex flex-row space-x-2 items-center">
          <img
            className="w-[4rem]"
            src={"http://" + process.env.REACT_APP_SERVER_URL + props.img}
            alt=""
          />
          <div className="">{props.Name}</div>
        </div>
        <div className=" justify-self-end flex flex-row space-x-3">
          <span>{props.Price + "₴"}</span>
        </div>
      </button>
      
      {open && 
      <div className="grid grid-cols-3  p-4 bg-white text-text1">
        {props.properties.map((prop)=>{
          const value = (""+prop.value).replace("true","✓").replace("false", "x")
          return <div>{prop.Name} : <span className="">{value}</span></div>;
        })}
      </div>}
    </div>
  );
}

export default Component;
