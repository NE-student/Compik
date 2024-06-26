import { useState } from "react";
import "./Component.css";
import { Icon } from "semantic-ui-react";

function Component(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className=" text-text4 bg-white w-full p-2 grid grid-flow-col items-center"
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
          <button
            onClick={props.onClick}
            className=" bg-accent px-5 py-1 rounded text-white"
          >
            Обрати
          </button>
        </div>
      </button>

      {open && (
        <div className="grid grid-cols-3  p-4 bg-white text-text1">
          {props.properties.map((prop) => {
            const value = ("" + prop.value)
              .replace("true", "✓")
              .replace("false", "x");
            return (
              <div>
                {prop.Name}{" "}
               {prop.Description && <div className="tooltip">
                  <Icon name="question circle" />
                  <span className="tooltiptext max-h-28 m-auto">
                    {prop.Description}
                  </span>
                </div>}{" "}
                : <span className="">{value}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Component;
