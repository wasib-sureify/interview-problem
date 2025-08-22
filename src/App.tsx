import { useState } from "react";
import "./App.css";

type Option = {
  name: string;
  price: number;
};

type Order = {
  type: Option;
  size: Option;
  addons: Option[];
  total: string;
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
  const [selectedType, setSelectedType] = useState<Option | null>(null);
  const [selectedSize, setSelectedSize] = useState<Option | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Option[]>([]);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleAddonChange = (addon: Option) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const calculateTotal = (): string => {
    let total = 0;
    if (selectedType) total += selectedType.price;
    if (selectedSize) total += selectedSize.price;
    selectedAddons.forEach((addon) => (total += addon.price));
    return total.toFixed(2);
  };

  const confirmOrder = () => {
    // if (!selectedType || !selectedSize) {
    //   alert("Please select coffee type and size!");
    //   return;
    // }
    setConfirmedOrder({
      type: selectedType!,
      size: selectedSize!,
      addons: selectedAddons,
      total: calculateTotal(),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        confirmOrder();
      }}
    >
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
              onChange={() => setSelectedType(type)}
              checked={selectedType?.name === type.name}
              required
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
              onChange={() => setSelectedSize(size)}
              checked={selectedSize?.name === size.name}
              required
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
              onChange={() => handleAddonChange(addon)}
              checked={selectedAddons.includes(addon)}
            />
            {` ${addon.name} (+$${addon.price})`}
          </label>
        ))}
      </fieldset>

      {/* Price */}
      <h3>Total: ${calculateTotal()}</h3>

      {/* Confirm Button */}
      <button type="submit">Confirm Order</button>

      {/* Order Summary */}
      {confirmedOrder && (
        <div className="order-summary">
          <h2>✅ Order Summary</h2>
          <p>Coffee: {confirmedOrder.type.name}</p>
          <p>Size: {confirmedOrder.size.name}</p>
          <p>
            Add-ons:{" "}
            {confirmedOrder.addons.length > 0
              ? confirmedOrder.addons.map((a) => a.name).join(", ")
              : "None"}
          </p>
          <p className="summary-total">Total: ${confirmedOrder.total}</p>
        </div>
      )}
    </form>
  );
}
