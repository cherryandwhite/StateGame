// React Imports
import React from 'react';

// More react Imports
import { StyleSheet, Text, View } from 'react-native';

class TwoByTwo extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'gray'}}>
          <View style={{flex: 1, flexDirection: 'horiztonal'}}>
            <View style={{flex: 1, textAlign: 'center', justifyContent: 'center'}}>
              {{this.props.TL}}
            </View>
            <View style={{flex: 1, textAlign: 'center', textAlign: 'center', justifyContent: 'center'>
              {{this.props.TR}}
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1, textAlign: 'center', textAlign: 'center', justifyContent: 'center'>
              {{this.props.BL}}
            </View>
            <View style={{flex: 1, textAlign: 'center', textAlign: 'center', justifyContent: 'center'>
              {{this.props.BR}}
            </View>
          </View>
        </View>
    );
  }
}
