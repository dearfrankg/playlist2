import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SearchResult from './SearchResult'
import VideoDetails from './VideoDetails'
import Playlists from './Playlists'

export default class Scene extends Component {

  renderScene = (route, navigator) => {
    switch (route.id) {
      case 'result':
        return (
          <View style={styles.scene}>
            <SearchResult
              isSearching={this.props.search.isSearching}
              keyword={this.props.search.keyword}
              result={this.props.search.result}
              moreVideos={this.props.moreVideos}
              viewVideo={this.props.viewVideo}
              isViewingVideo={this.props.search.isViewingVideo}
              viewedVideo={this.props.search.viewedVideo} />
          </View>
        )
      case 'videoDetails':
        return (
          <View style={styles.scene}>
            <VideoDetails
              navigator={navigator}
              viewVideoUnload={this.props.viewVideoUnload}
              viewedVideo={this.props.search.viewedVideo}
              listPlaylist={this.props.listPlaylist} />
          </View>
        )
      case 'playlists':
        return (
          <View style={styles.scene}>
            <Playlists
              navigator={navigator}
              playlist={this.props.playlist}
              listPlaylistUnload={this.props.listPlaylistUnload}
              addToPlaylist={this.props.addToPlaylist} />
          </View>
        )
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
        initialRoute={{
          id: 'result',
          title: `'${this.props.search.keyword}'`,
          index: 0
        }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={NavigationBarRouteMapper} />
        }
        newSearch={this.props.newSearch} />
    )
  }
}
