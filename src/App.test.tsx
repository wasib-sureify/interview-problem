import {beforeEach, describe, expect, test} from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoffeeMachine from "./App";

// Basic render test

describe('Coffee Machine', ()=>{

  beforeEach(()=>{
    render(<CoffeeMachine />);
  })


  test("renders Coffee Vending Machine title", () => {
    expect(screen.getByText(/Coffee Vending Machine/i)).toBeInTheDocument();
  });


// Ensure coffee type selection works
  test("selects a coffee type", () => {
    const espressoOption = screen.getByLabelText(/Espresso/i);
    fireEvent.click(espressoOption);
    expect(espressoOption).toBeChecked();
  });

// Ensure size selection works
  test("selects a coffee size", () => {
    const mediumOption = screen.getByLabelText(/Medium/i);
    fireEvent.click(mediumOption);
    expect(mediumOption).toBeChecked();
  });

// Ensure add-ons can be selected and deselected
  test("toggles addons correctly", () => {
    const milkOption = screen.getByLabelText(/Milk/i);
    fireEvent.click(milkOption);
    expect(milkOption).toBeChecked();
    fireEvent.click(milkOption);
    expect(milkOption).not.toBeChecked();
  });

// Ensure total updates with selections
  test("updates total when selecting coffee and size", () => {
    fireEvent.click(screen.getByLabelText(/Latte/i));
    fireEvent.click(screen.getByLabelText(/Large/i));
    const total = screen.getByTestId('total');
    expect(total.textContent).toEqual('Total: $7.00');
  });

// Ensure confirm order displays summary
  test("displays order summary after confirming", () => {
    fireEvent.click(screen.getByLabelText(/Cappuccino/i));
    fireEvent.click(screen.getByLabelText(/Small/i));
    fireEvent.click(screen.getByText(/Confirm Order/i));
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Coffee: Cappuccino/i)).toBeInTheDocument();
    expect(screen.getByText(/Size: Small/i)).toBeInTheDocument();
  });
})


