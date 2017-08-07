import React from "react"
import ReactDOM from "react-dom"

export enum Scale {
    Celsius,
    Fahrenheit
}

interface Props {
    temperature: number
}

interface State {
    temperature: string;
    scale: Scale;
}

function BoilingVerdict(props: { temperature: number }) {
    if (props.temperature >= 100)
        return <p>The water would boil.</p>

    return <p>The water would not boil.</p>;
}

function TemperatureInput(props: {
    temperature: string,
    scale: Scale,
    onTemperatureChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
}) {

    return (
        <fieldset>
            <legend>Enter temperature in {Scale[props.scale]}:</legend>
            <input value={props.temperature} onChange={props.onTemperatureChange} />
        </fieldset>
    );
}

export class Calculator extends React.Component<Props, State>{
    constructor(props: Props) {
        super();
        this.state = {
            temperature: props.temperature.toString(),
            scale: Scale.Celsius
        };
    }

    handleCelsiusChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (args) => {
        this.setState({
            scale: Scale.Celsius,
            temperature: args.target.value
        });
    }

    handleFahrenheitChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (args) => {
        this.setState({
            scale: Scale.Fahrenheit,
            temperature: args.target.value
        });
    }

    render() {
        const celsius = this.state.scale == Scale.Celsius ? this.state.temperature : convert(this.state.temperature, toCelsius);
        const fahrenheit = this.state.scale == Scale.Fahrenheit ? this.state.temperature : convert(this.state.temperature, toFahrenheit);

        return (
            <div>
                <TemperatureInput key={Scale.Celsius} scale={Scale.Celsius} temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput key={Scale.Fahrenheit} scale={Scale.Fahrenheit} temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict temperature={parseFloat(celsius)} />
            </div>
        );
    }
}

function toCelsius(fahrenheit: number) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number) {
    return (celsius * 9 / 5) + 32;
}

function convert(temperature: string, converter: (t: number) => number) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = converter(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}