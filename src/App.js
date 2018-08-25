import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import testMComponent from './testMComponent'

import meiosisTracer from "meiosis-tracer";
import flyd from 'flyd'

const componentA = new testMComponent()
const componentB = new testMComponent({click:55})

const mixUpdate = flyd.merge(componentA.update, componentB.update)

const mixListener = flyd.scan((o, n) => { return {
  a: componentA.listener(),
  b: componentB.listener()
} }, {
  a: componentA.listener(),
  b: componentB.listener()
}, mixUpdate)

meiosisTracer({ selector: "#tracer", streams: [ mixListener, componentA.listener ] });

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

    mixListener.map( model => self.setState({model}) )
    // componentA.listener.map(model => {
    //   self.setState({ a: model });
    // });
    // componentB.listener.map(model => {
    //   self.setState({ b: model });
    // });
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
