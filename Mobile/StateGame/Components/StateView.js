// React Imports
import React, { Component } from 'react';

// More react imports
import { Text } from 'react-native';

class StateView extends Component {
  render() {
    return (
      <Text>{this.props.state}</Text>
    )
  }
}

module.exports = StateView
