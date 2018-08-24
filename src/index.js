import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import flyd from 'flyd'
import meiosisTracer from "meiosis-tracer";

const initModels = {
  authen: {
    login: false
  },
  test: {
    click: 0
  }
}

const update = flyd.stream();
const models = flyd.scan((model, updateFunc) => updateFunc(model), initModels, update);

// meiosisTracer({ selector: "#tracer", streams: [ models ] });

let actions = {
  authen: {
    login: (update) => (model) => {},
    logout: (update) => (model) => {},
    check: (update) => (model) => {}
  },
  test: {
    click: () => {
      update(model => {model.test.click++; return model})
    },
    typing: (value) => {
      update(model => {model.test.click = value; return model})
    }
  }
}

// models.map( v => console.log(v) )

window.models = models
window.actions = actions
window.update = update

ReactDOM.render(<App models={models} actions={actions} />, document.getElementById('root'));
registerServiceWorker();
