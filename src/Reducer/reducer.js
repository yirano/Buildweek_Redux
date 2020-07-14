import {
  LOAD_POSTS,
  LOG_OUT,
  PHOTO_SPOTLIGHT,
  DATA_LOADING,
  LOAD_ALBUMS,
  EDIT_ALBUM
} from '../Action/action'

const initialState = {
  data: [],
  albumData: [],
  error: '',
  spotLight: [],
  isLoggedIn: false,
  isLoading: false,
  isEditingAlbum: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_LOADING:
      return { ...state, isLoading: payload }
    case LOAD_POSTS:
      return { data: payload.data, error: payload.error, isLoggedIn: true, isLoading: false, albumData: state.albumData }
    case LOG_OUT:
      return { ...state, isLoggedIn: payload }
    case PHOTO_SPOTLIGHT:
      return {
        ...state,
        isLoggedIn: true,
        spotLight: payload
      }
    case LOAD_ALBUMS:
      return { ...state, albumData: payload, error: '', spotLight: state.spotLight, isLoggedIn: true, isLoading: false }
    case EDIT_ALBUM:
      console.log(payload)
      return { ...state, isEditingAlbum: payload }
    default:
      return state
  }
}


