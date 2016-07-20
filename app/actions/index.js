import * as types from '../constants/actionTypes'

const youtubeApiKey = 'AIzaSyB8k0w1WW042EBy4dhkSlvx5hOsJwh0bXg'
const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3'

export const setSearchTerm = (searchTerm) => ({type: types.SET_SEARCH_TERM, searchTerm})
export const runSearch = (searchTerm) => (dispatch) => _searchVideos(dispatch, searchTerm)
export const resetSearch = () => ({type: types.RESET_SEARCH})
export const moreVideos = (searchTerm, nextPageToken) => (dispatch) => _searchVideos(dispatch, searchTerm, nextPageToken)

const _searchVideos = (dispatch, searchTerm, nextPageToken = null) => {
  dispatch(_searchStarted(searchTerm))

	const encodedKeyword = searchTerm.replace(' ', '+')
	let url = `${youtubeApiBaseUrl}/search?part=snippet&q=${encodedKeyword}&type=video&maxResults=10&key=${youtubeApiKey}`
	if (nextPageToken) {
		url += `&pageToken=${nextPageToken}`
	}

	return fetch(url)
		.then((resp) => resp.json())
		.then((data) => {
			if (data.error) throw data.error.message || 'Unable to search'
			return data
		})
		.then((data) => {
			if (nextPageToken) {
				dispatch(_moreSearchResultReceived(data))
			} else {
				dispatch(_searchResultReceived(data))
			}
		})
		.catch((err) => {
			dispatch(_searchFailed(err))
		})
}
const _searchStarted = (searchTerm) => ({type: types.SEARCH_STARTED, searchTerm})
const _searchResultReceived = (data) => ({type: types.SEARCH_RESULT, data})
const _moreSearchResultReceived = (data) => ({type: types.MORE_SEARCH_RESULT, data})
const _searchFailed = (message) => ({type: types.SEARCH_FAILED, message})

export const viewVideoUnload = () => ({type: types.VIEW_VIDEO_UNLOAD})
export const viewVideo = (videoId) => {
	return (dispatch) => {
		dispatch(_viewVideoStarted())

		const url = `${youtubeApiBaseUrl}/videos?part=snippet%2Cstatistics%2Cplayer&id=${videoId}&maxResults=1&key=${youtubeApiKey}`
		return fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				if (data.error) throw data.error.message || 'Unable to view video'
				return data
			})
			.then((data) => {
				const video = (data.pageInfo.totalResults > 0) ? data.items[0] : null
				dispatch(_viewVideoResult(video))
			})
			.catch((err) => {
				dispatch(_viewVideoFailed(err))
			})
	}
}
const _viewVideoStarted = () => ({type: types.VIEW_VIDEO_STARTED})
const _viewVideoResult = (data) => ({type: types.VIEW_VIDEO_RESULT, data})
const _viewVideoFailed = (message) => ({type: types.VIEW_VIDEO_FAILED, message})
