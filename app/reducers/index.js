import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'
import * as actions from '../actions'

const initialSearchState = {
  searchTerm: '',
  isSearching: false,
  isViewingResult: false,
  result: {
    items: [],
    prevPageToken: null,
    nextPageToken: null,
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0
    }
  },
  error: ''
}

const search = (state = initialSearchState, action) => {
	switch (action.type) {
		case types.SET_SEARCH_TERM:
			return Object.assign({}, state, {searchTerm: action.searchTerm})

    case types.SEARCH_STARTED:
			return Object.assign({}, state, {isSearching: true})

    case types.SEARCH_RESULT:
			return Object.assign({}, state, {
				isViewingResult: true,
				isSearching: false,
				result: Object.assign({}, state.result, {
					items: action.data.items,
					prevPageToken: action.data.prevPageToken || null,
					nextPageToken: action.data.nextPageToken || null,
					pageInfo: action.data.pageInfo
				})
			})

		case types.MORE_SEARCH_RESULT:
			return Object.assign({}, state, {
				isViewingResult: true,
				isSearching: false,
				isViewingVideo: false,
				viewedVideo: null,
				result: Object.assign({}, state.result, {
					items: [
						...state.result.items,
						...action.data.items
					],
					prevPageToken: action.data.prevPageToken || null,
					nextPageToken: action.data.nextPageToken || null,
					pageInfo: action.data.pageInfo
				})
			})

    case types.SEARCH_FAILED:
			return Object.assign({}, state, {
				error: action.message,
				isViewingResult: false,
				isSearching: false,
				result: {
					items: [],
					prevPageToken: null,
					nextPageToken: null,
					pageInfo: {
						resultsPerPage: 0,
						totalResults: 0
					}
				}
			})






    default:
      return state
  }
}




const rootReducer = combineReducers({
  search
})

console.log(typeof rootReducer)

export default rootReducer
