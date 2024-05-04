import { useSelector } from "react-redux";
import "./ConfigurationStats.css";

function ConfigurationStats() {
  const configurationComponents = useSelector((state) => state.configuration.configurationComponents);
  const price = Object.values(configurationComponents).reduce((accumulator, currentValue) => {
    return (+accumulator) + (+currentValue.Price)
  },0);
  
  return (
    <>
      {configurationComponents &&  Object.keys(configurationComponents).length >= 1 &&( //
        <div className=" flex flex-col justify-items-center">
          <div className="flex flex-col items-center min-h-[10rem]  max-w-[20rem] bg-third rounded-lg border-border1 border space-y-4 p-4">
            <h1 className=" text-2xl text-white">Конфігурація:</h1>
            <div className=" text-white text-left w-full text-lg">
              <p>Комплеткуючих: {Object.keys(configurationComponents).length}</p>
              <p>Ціна: {price} грн.</p>
            </div>
            <button className=" w-full justify-self-end bg-accent px-5 py-1 rounded text-white">
              Зберегти в профіль
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfigurationStats;
