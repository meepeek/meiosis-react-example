import flyd from 'flyd'
import React, { Component}  from 'react';

export default class testMComponent {
  constructor(initState = null) {
    this.initState = {
      click: 0
    }
    if (initState != null) this.initState = Object.assign(this.initState, initState)

    const self = this
    self.update = flyd.stream()
    self.actions = {
      typing: (v) => {
        self.update(model => {model.click = v; return model})
      },
      click: () => self.update(model => {model.click++; return model})
    }
    self.listener = flyd.scan((model, updateFunc) => updateFunc(model), self.initState, self.update)
    self.view = (model) => (
      <div>
        <input type="text" value={model.click} onInput={evt => self.actions.typing(evt.target.value)} />
        <button onClick={ evt => {evt.preventDefault(); self.actions.click()} } />
      </div>
    )
  }

}
