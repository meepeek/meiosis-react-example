import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import testMComponent from './testMComponent'

import meiosisTracer from "meiosis-tracer";

const componentA = new testMComponent()
const componentB = new testMComponent({click:55})

meiosisTracer({ selector: "#tracer", streams: [ componentA.listener, componentB.listener ] });

class App extends Component {
  constructor(props) {
    super(props);
    const self = this;

    self.state = {
      a: componentA.listener(),
      b: componentB.listener()
    };

    self.actions = props.actions
    self.models = props.models

  }

  componentDidMount() {
    const self = this;

    componentA.listener.map(model => {
      self.setState({ a: model });
    });
    componentB.listener.map(model => {
      self.setState({ b: model });
    });
  }

  render() {
    return (
      <div className="App">
      {componentA.view(this.state.a)}
      {componentB.view(this.state.b)}
      </div>
    );
  }
}

export default App;
