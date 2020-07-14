import axios from 'axios'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'
import { useState } from 'react'

export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const LOG_OUT = 'LOG_OUT'
export const LOAD_POSTS = 'LOAD_POSTS'
export const PHOTO_SPOTLIGHT = 'PHOTO_SPOTLIGHT'
export const DATA_LOADING = 'DATA_LOADING'
export const LOAD_ALBUMS = 'LOAD_ALBUMS'
export const EDIT_ALBUM = 'EDIT_ALBUM'


export const logIn = (credentials) => dispatch => {
  axios.post('https://expat-journal2.herokuapp.com/api/auth/login', credentials)
    .then(res => {
      console.log('Log in success --> ', res)
      localStorage.setItem('id', res.data.id)
      localStorage.setItem('token', res.data.token)
      dispatch({ type: DATA_LOADING, payload: false })
      window.location.reload(true)
    })
    .catch(err => console.log('Error logging in -->', err.response))
}

export const logOut = () => dispatch => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  dispatch({ type: LOG_OUT, payload: false })
}

export const loadAlbums = (id) => dispatch => {
  axiosWithAuth().get(`/users/${id}`)
    .then(res => {
      dispatch({ type: LOAD_ALBUMS, payload: res.data.stories })
    })
    .catch(err => {
      console.log('Album Load Failed --> ', err.response)
    })
}

export const loadPosts = (id) => dispatch => {
  axiosWithAuth().get(`stories/${id}/photos`)
    .then(res => {
      console.log(res.data)
      dispatch({ type: LOAD_POSTS, payload: { data: res.data } })
    })
    .catch(err => {
      console.log('Error while fetching data --> ', err.response)
      dispatch({ type: LOAD_POSTS, payload: { data: [], error: err.response }, })
    })
}



export const addAlbum = (post, id) => dispatch => {
  axiosWithAuth().post(`/users/${id}/stories`, post)
    .then(res => {
      console.log('New Album Created --> ', res.data)
      window.location.reload(true)
    })
    .catch(err => {
      console.log('Error Creating New Album --> ', err.response)
    })
}

export const addPost = (post, id) => dispatch => {
  // id here uses the album id
  axiosWithAuth().post(`/stories/${id}/photos`, post)
    .then(res => {
      console.log('Post Successful --> ', res)
      window.location.reload(true)
    })
    .catch(err => console.log('Post error --> ', err.response))
}

export const editAlbum = (id, info) => dispatch => {
  console.log('EDITALBUM --> ', id)
  axiosWithAuth().put(`/stories/${id}`, info)
    .then(res => {
      window.location.reload(true)
    })
    .catch(err => console.log('Error Editing Album --> ', err.response))
}

export const editPost = (id, post) => dispatch => {
  axiosWithAuth().put(`/photos/${id}`, post)
    .then(res => {
      console.log('Post Edit Success --> ', res)
      // window.location.reload(true)
    })
    .catch(err => console.log('Error editing --> ', err.response))
}

export const spotLight = (id) => dispatch => {
  axiosWithAuth().get(`/photos/${id}`)
    .then(res => {
      // console.log('ACTION --> spotLight --> ', res)
      dispatch({ type: PHOTO_SPOTLIGHT, payload: res.data })
    })
    .catch(err => console.log('Spotlight error --> ', err.response))
}

export const removeAlbum = id => dispatch => {
  axiosWithAuth().delete(`/stories/${id}`)
    .then(res => {
      console.log('Album Delete Successful --> ', res)
      window.location.reload(true)

    })
    .catch(err => console.log('Error Deleting Album --> ', err.response))
}

export const deletePhoto = (id) => dispatch => {
  // console.log('Delete Photo Action ID --> ', id)
  axiosWithAuth().delete(`/photos/${id}`)
    .then(res => {
      console.log('Photo Delete successful --> ', res)
      window.location.reload(true)
    })
    .catch(err => console.log('Error deleting --> ', err.response))
}