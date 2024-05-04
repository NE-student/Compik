import React from 'react';
import './Slider.css';



function Slider(props) {

    const min = props.min || 0
    const max = props.max || 100000

    const [minNumber, setMinNumber] = props.minNumber
    const [maxNumber, setMaxNumber] = props.maxNumber


    const ChangeProgressBar = (element)=>{
        if(!element) return;
        element.style.left = ((minNumber-min) / (max-min)) * 100 + "%";
        element.style.right = 100 - ((maxNumber - min) / (max - min)) * 100 + "%";
    }

    const onMinChange = (e)=>{
        const value = +e.target.value
        if(value >= maxNumber) return
        setMinNumber(value);
    }
    const onMaxChange = (e)=>{
        const value = +e.target.value
        if(value <= minNumber || value > max) return
        setMaxNumber(value);
        
    }

  return (
    <div>
      <div className="price-input">
        <div className="field">
          <span>вiд:</span>
          <input value={minNumber} onChange={onMinChange} type="number" className="input-min" />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <span>до:</span>
          <input value={maxNumber} onChange={onMaxChange} type="number"  className="input-max"/>
        </div>
      </div>
      <div className="slider">
        <div ref={ChangeProgressBar} className="progress bg-accent2"></div>
      </div>
      <div className="range-input">
        <input type="range" className="range-min" min={""+min || "0"} max={""+max ||"10000"} onChange={onMinChange} value={minNumber}  step="1"/>
        <input type="range" className="range-max" min={""+min || "0"} max={""+max ||"10000"} onChange={onMaxChange} value={maxNumber}  step="1"/>
      </div>
    </div>
  );
}

export default Slider;
