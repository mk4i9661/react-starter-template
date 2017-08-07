import * as React from "react"
import { shallow, mount, render } from "enzyme"
import { Calculator, Scale } from "./Calculator"
import Renderer from 'react-test-renderer'

it("checks whether the water would boil if its temperature is below 100 degrees", () => {
    const calculator = mount(<Calculator temperature={15} />);
    expect(calculator.contains(<p>The water would not boil.</p>)).toBeTruthy();
});

it("checks whether the water would boil if its temperature is above 99 degrees", () => {
    const calculator = mount(<Calculator temperature={100} />);
    expect(calculator.contains(<p>The water would boil.</p>)).toBeTruthy();
});

it("checks whether input elements have synchronized values", () => {
    const calculator = mount(<Calculator temperature={15} />);
    //celsius
    expect(calculator.containsMatchingElement(<input value="15" />)).toBeTruthy();
    //fahrenheit
    expect(calculator.containsMatchingElement(<input value="59" />)).toBeTruthy();

    //change celsius to 60
    calculator.find({ value: "15" }).simulate("change", { target: { value: "60" } });
    //fahrenheit input should contain synchronized value
    expect(calculator.containsMatchingElement(<input value="140" />)).toBeTruthy();

    //change fahrenheits to 32
    calculator.find({ value: "140" }).simulate("change", { target: { value: "32" } });
    //celsius should contain synzhronized value
    expect(calculator.containsMatchingElement(<input value="0" />)).toBeTruthy();
});