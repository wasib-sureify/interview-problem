import "./App.css";
import {useState} from "react";

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
    { name: "Espresso", price: 3 },
    { name: "Cappuccino", price: 4 },
    { name: "Latte", price: 5 },
  ],
  sizes: [
    { name: "Small", price: 0 },
    { name: "Medium", price: 1 },
    { name: "Large", price: 2 },
  ],
  addons: [
    { name: "Milk", price: 0.5 },
    { name: "Sugar", price: 0.2 },
    { name: "Cream", price: 0.7 },
  ],
};

export default function CoffeeMachine() {
    const [coffeeType, setCoffeeType] = useState<string>('');
    const [coffeeSize, setCoffeeSize] = useState<string>('');
    const [coffeeAddons, setCoffeeAddons] = useState<string[]>([]);

    const handleCoffeeAddon = (name: string) => {
        const coffeeFound = coffeeAddons.find(item=>item===name);
        console.log(coffeeFound, name);
        if (coffeeFound) {
            setCoffeeAddons((prevState)=>prevState.filter(item=>item!==name));
        } else {
            const addons = coffeeAddons.map((item)=>item);
            addons.push(name);
            setCoffeeAddons(addons);
        }
    }

    const isItemInArray = (item:string)=> coffeeAddons.some(coffee=>coffee===item);

    const sumItems = ()=>{
        const coffeePrice = coffeeConfig.types.find(coffee=>coffee.name===coffeeType)?.price || 0;
    }

  return (
    <form>
      <h1>☕ Coffee Vending Machine</h1>
      {/* Coffee Types */}
      <fieldset>
        <legend>Select Coffee Type</legend>
        {coffeeConfig.types.map((type) => (
          <label key={type.name}>
            <input
                onChange={(event)=>{
                    setCoffeeType(event.target.value);
                }}
              type="radio"
              name="coffeeType"
              value={type.name}
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
                onChange={(event)=>{
                    setCoffeeSize(event.target.value);
                }}
              type="radio"
              name="coffeeSize"
              value={size.name}
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
            <input onChange={(event)=>handleCoffeeAddon(addon.name)}
              type="checkbox"
              checked={isItemInArray(addon.name)}
            />
            {` ${addon.name} (+$${addon.price})`}
          </label>
        ))}
      </fieldset>

      {/* Price */}
      <h3 data-testid="total">Total: $0</h3>

      {/* Confirm Button */}
      <button type="submit">Confirm Order</button>

      {/* Order Summary */}
      {/*  Display order summary here*/}
    </form>
  );
}
