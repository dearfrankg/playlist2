import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import SearchResult from './SearchResult'
import VideoDetails from './VideoDetails'
import Playlists from './Playlists'


/*
<SearchResult
  isSearching={this.props.search.isSearching}
  keyword={this.props.search.keyword}
  result={this.props.search.result}
  moreVideos={this.props.moreVideos}
  viewVideo={this.props.viewVideo}
  isViewingVideo={this.props.search.isViewingVideo}
  viewedVideo={this.props.search.viewedVideo} />

<VideoDetails
  navigator={navigator}
  viewVideoUnload={this.props.viewVideoUnload}
  viewedVideo={this.props.search.viewedVideo}
  listPlaylist={this.props.listPlaylist} />


<Playlists
  navigator={navigator}
  playlist={this.props.playlist}
  listPlaylistUnload={this.props.listPlaylistUnload}
  addToPlaylist={this.props.addToPlaylist} />


*/



const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
    	return (
    		<TouchableOpacity
	        onPress={navigator.props.resetSearch}
	        style={styles.navBarLeftButton}>
	        <Text style={[styles.navBarText, styles.navBarButtonText]}>
	          &laquo; Search
	        </Text>
	      </TouchableOpacity>
	     )
    }

    const previousRoute = navState.routeStack[index - 1]
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          &laquo; {(index === 1)  ? 'Result' : 'Back'}
        </Text>
      </TouchableOpacity>
    )
  },

  RightButton(route, navigator, index, navState) {
  	return null
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    )
  }
}

export default class Scene extends Component {

  renderScene = (route, navigator) => {
    switch (route.id) {
      case 'result':
        return (
          <View style={styles.scene}>
            <SearchResult
              {...this.props} />
          </View>
        )
      case 'videoDetails':
        return (
          <View style={styles.scene}>
            <VideoDetails />
          </View>
        )
      case 'playlists':
        return (
          <View style={styles.scene}>
            <Playlists />
          </View>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          id: 'result',
          title: `'${this.props.search.searchTerm}'`,
          index: 0
        }}
        ref="navigator"
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={NavigationBarRouteMapper} />
        }
        resetSearch={this.props.actions.resetSearch} />
    )
  }
}

const styles = StyleSheet.create({

  container: {
		flex: 1,
		justifyContent: 'center'
	},
	navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  scene: {
  	flex: 1,
  	paddingTop: 63,
  }

});
