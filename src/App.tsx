import "./App.css";
import {useState, useMemo} from "react";

type Option = {
  name: string;
  price: number;
};

const coffeeConfig: {
  types: Option[];
  sizes: Option[];
  addons: Option[];
} = {
  types: [
    { name: "Espresso", price: 3.00 },
    { name: "Cappuccino", price: 4.00 },
    { name: "Latte", price: 5.00 },
  ],
  sizes: [
    { name: "Small", price: 0.00 },
    { name: "Medium", price: 1.00 },
    { name: "Large", price: 2.00 },
  ],
  addons: [
    { name: "Milk", price: 0.50 },
    { name: "Sugar", price: 0.20 },
    { name: "Cream", price: 0.70 },
  ],
};

export default function CoffeeMachine() {

    const [currentType,setCurrentType]=useState(null);
    const [currentSize,setCurrentSize]=useState(null);
    const [currentAddons, setCurrentAddons]=useState([]);

    const total = useMemo(()=>{
        const typeValue = currentType?.price ?? 0;
        const sizeValue = currentSize?.price ?? 0;
        const addonsValue = currentAddons.reduce((prev, curr)=>{ return prev+curr.price},0 )

        return typeValue+sizeValue+addonsValue;
    },[currentType, currentSize, currentAddons]);

  return (
    <form>
      <h1>☕ Coffee Vending Machine</h1>
      {/* Coffee Types */}
      <fieldset>
        <legend>Select Coffee Type</legend>
        {coffeeConfig.types.map((type) => (
          <label key={type.name}>
            <input
              type="radio"
              name="coffeeType"
              value={type.name}
              onClick={()=>setCurrentType(type)}
            />
            {` ${type.name} ($${type.price})`}
          </label>
        ))}
      </fieldset>

      {/* Sizes */}
      <fieldset>
        <legend>Select Size</legend>
        {coffeeConfig.sizes.map((size) => (
          <label key={size.name}>
            <input
              type="radio"
              name="coffeeSize"
              value={size.name}
              onClick={()=> {
                  console.log("size",size)
                  setCurrentSize(size)
              }}
            />
            {` ${size.name} (+$${size.price})`}
          </label>
        ))}
      </fieldset>

      {/* Addons */}
      <fieldset>
        <legend>Add-ons</legend>
        {coffeeConfig.addons.map((addon) => (
          <label key={addon.name}>
            <input
              type="checkbox"
              value={addon.name}
              onClick={(e)=> {
                  if(e.target.value==true) {
                      setCurrentAddons(addon)
                  } else {
                      setCurrentAddons(currentAddons.filter(x=>x.name!=addon.name))
              }
              }}
            />
            {` ${addon.name} (+$${addon.price})`}
          </label>
        ))}
      </fieldset>

      {/* Price */}
      <h3>Total: ${total.toFixed(2)}</h3>

      {/* Confirm Button */}
      <button onClick={()=>console.log(currentType,currentSize, currentAddons)}>Confirm Order</button>
      {/* Order Summary */}
      {/*  Display order summary here*/}
    </form>
  );
}
