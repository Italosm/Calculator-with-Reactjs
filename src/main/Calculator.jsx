import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import "./Calculator.css";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    const values = [...this.state.values];
    const currentDisplayValue = values[0];
    const equals = operation === "=";
    const i = this.state.current;
    const currentOperation = this.state.operation;
    console.log(values, i, operation, currentOperation);
    switch (operation) {
      case "+/-":
        if (i === 0) {
          values[0] = eval(`${values[0] * -1}`);
          this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: currentDisplayValue === 0 ? true : !equals,
            values,
          });
        } else {
          values[1] = eval(`${values[1] * -1}`);
          this.setState({
            displayValue: values[1],
            operation: equals ? operation : currentOperation,
            current: equals ? 0 : 1,
            clearDisplay: currentDisplayValue === 0 ? true : !equals,
            values,
          });
        }
        break;
      case "%":
        if (i === 0) {
          values[0] = eval(`${values[0] / 100}`);
          values[1] = 0;
          this.setState({
            displayValue: values[0],
            operation: equals ? operation : currentOperation,
            current: 0,
            clearDisplay: currentDisplayValue === 0 ? true : !equals,
            values,
          });
        } else {
          const percent = eval(`${(values[0] * values[1]) / 100}`);
          values[1] = eval(`${values[0]} ${currentOperation} ${percent}`);
          values[0] = values[1];
          this.setState({
            displayValue: values[1],
            operation: equals ? operation : currentOperation,
            current: 0,
            clearDisplay: currentDisplayValue === 0 ? true : !equals,
            values,
          });
        }
        break;

      default:
        if (i === 0) {
          this.setState({
            operation: operation,
            current: 1,
            clearDisplay: true,
            values,
          });
        } else {
          try {
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
          } catch (e) {
            values[0] = this.state.values[0];
          }
          const currentDisplayValue = values[0];
          values[1] = 0;
          this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: currentDisplayValue === 0 ? true : !equals,
            values,
          });
        }
    }
  }

  addDigit(n) {
    if (
      n === "." &&
      this.state.displayValue.includes(".") &&
      this.state.current === 0
    ) {
      return;
    }
    console.log(this.state.current);

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} />
        <Button label="+/-" click={this.setOperation} />
        <Button label="%" click={this.setOperation} />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}

/*
if (this.state.current === 0 && this.state.operation === '+/-' && this.state.operation === '%') {
    this.setState({operation, current: 1, clearDisplay: true})
} else {
    const equals = operation === '='
    const currentOperation = this.state.operation
    const values = [...this.state.values]
    try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
    } catch(e) {
        values[0] = this.state.values[0]
    }
    const currentDisplayValue = values[0] 
    values[1] = 0
    this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: inverse? 0 : 1,
        clearDisplay: currentDisplayValue === 0 ? true : !equals,
        values 

    })
}*/
