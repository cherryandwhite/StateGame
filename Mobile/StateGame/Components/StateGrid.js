// React Imports
import React, { Component } from 'react';

// Require the gridding system
import { TwoByTwo } from './TwoByTwo.js';

// The StateView as well
import { StateView } from './StateView.js';

class StateGrid extends Component {
  render() {
    return (

      // Construct the State objects into a two by two grid
      <TwoByTwo
        TL={ <StateView state={this.props.states[0]}></StateView> }
        TR={ <StateView state = {this.props.states[1]}></StateView> }
        BL={ <StateView state = {this.props.states[2]}></StateView> }
        BR={ <StateView state = {this.props.states[3]}></StateView> }
      ></TwoByTwo>
    );
  }
}

module.exports = StateGrid;
