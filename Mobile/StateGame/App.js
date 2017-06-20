import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StateGrid } from './Components/StateGrid.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'gray'}}>
          <Text>This is where the question will be</Text>
        </View>
        <StateGrid states={['PA', 'DE', 'MD', 'NY']}></StateGrid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('StateGame', () => App)
