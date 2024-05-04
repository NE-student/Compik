import "./Category.css";
import React from "react";

function Category(props) {
  return (
    <div className="flex-shrink-0 text-center m-2 text-text4 grid grid-flow-row content-center justify-items-center gap-3">
      <button onClick={() => props.onClick(props.id)} className=" w-32 h-32">
        <div
          className={
            props.exist
              ? " bg-accent5 p-2 w-full h-full border-[2px] border-accent3  rounded-lg hover:bg-third flex "
              : "bg-accent5 p-2 w-full h-full border-[2px] border-accent3  rounded-lg hover:bg-third flex "
          }
        >
          <img
            className={props.exist ? "m-auto object-center ": "m-auto object-center mix-blend-overlay"}
            src={"http://" + process.env.REACT_APP_SERVER_URL + props.Photos}
            alt=""
          />
        </div>
      </button>
      <p>{props.Name}</p>
    </div>
  );
}

export default Category;
