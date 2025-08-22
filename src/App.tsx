import "./App.css";

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
            />
            {` ${addon.name} (+$${addon.price})`}
          </label>
        ))}
      </fieldset>

      {/* Price */}
      <h3>Total: $0</h3>

      {/* Confirm Button */}
      <button>Confirm Order</button>

      {/* Order Summary */}
      {/*  Display order summary here*/}
    </form>
  );
}
