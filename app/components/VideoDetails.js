import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	WebView,
	Dimensions,
	TouchableHighlight
} from 'react-native'

export default class VideoDetails extends React.Component {
	componentWillUnmount() {
		this.props.actions.viewVideoUnload()
	}

	getVideoId() {
		return this.props.search.viewedVideo.id
	}

	getPlayer() {
		const {height, width} = Dimensions.get('window');
		const videoId = this.getVideoId()
		return {
			html: `<iframe
							width="${width-15}"
							height="280"
							src="https://www.youtube.com/embed/${videoId}"
							frameborder="0">
						</iframe>`
		}
	}

	handleAddToPlaylist = () => {
		const videoId = this.getVideoId()
		if (videoId) this.props.actions.listPlaylist(videoId)
	}

	formatStat(count) {
		return parseInt(count, 10).toLocaleString()
	}

	render() {
		const player = this.getPlayer()
		const stats = this.props.search.viewedVideo.statistics

		return (
			<View style={styles.container}>
				<View style={styles.webview}>
					<WebView
						source={player} />
				</View>
				<View style={styles.statistics}>
					<Text style={styles.stats}>
						* <Text style={{fontWeight: 'bold'}}>{this.formatStat(stats.viewCount)}</Text> Views
					</Text>
					<Text style={styles.stats}>
						* <Text style={{fontWeight: 'bold'}}>{this.formatStat(stats.likeCount)}</Text> Likes
					</Text>
					<Text style={styles.stats}>
						* <Text style={{fontWeight: 'bold'}}>{this.formatStat(stats.commentCount)}</Text> Comments
					</Text>
				</View>
				<TouchableHighlight
					style={styles.footer}
					underlayColor="#991111"
					onPress={this.handleAddToPlaylist}>
					<Text style={styles.footerButtonText}>+ Add to Playlist</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	webview: {
		height: 290
	},
	statistics: {
		padding: 10,
		flex: 1
	},
	stats: {
		fontSize: 16
	},
	footer: {
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#E62117',
		alignSelf: 'stretch',
		justifyContent: 'center',
	},
	footerButtonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold'
	},
})
