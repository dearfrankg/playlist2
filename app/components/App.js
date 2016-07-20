import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Search from './Search'
import Scene from './Scene'


class App extends Component {

  render() {
    let cmp = null
		if (this.props.search.isViewingResult) {
			cmp = (
        <Scene {...this.props} />
			)
    } else {
      cmp = (
        <Search {...this.props} />
			)
    }

    return (
      <View style={styles.container}>
        {cmp}
      </View>
    )
  }
}

export default connect(
  (state) => ({
    search: state.search,
  	playlist: state.playlist
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
