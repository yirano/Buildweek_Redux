import React, { useState, useEffect } from 'react'
import { Form, Label, Input, Button } from 'reactstrap'
import { addPost, editPost } from '../Action/action'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'
const initialState = {
  photo_url: '',
  photo_title: '',
  photo_description: ''
}
const Edit = (props) => {
  const photoID = useParams().id2
  const albumID = useParams().id1

  const [formState, setFormState] = useState(initialState)

  const handleSubmit = e => {
    e.preventDefault()
    props.editPost(photoID, formState)
    setFormState(initialState)
    props.history.push(`/albums/${albumID}`)
  }

  useEffect(() => {
    axiosWithAuth().get(`/photos/${photoID}`)
      .then(res => {
        setFormState({
          photo_url: res.data.photo_url,
          photo_title: res.data.photo_title,
          photo_description: res.data.photo_description
        })
      })
  }, [])

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.value
    })
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label for="photo_title">
          <legend>Title</legend>
          <Input
            id="photo_title"
            type="text"
            name="photo_title"
            onChange={e => handleChange(e)}
            value={formState.photo_title}
          />
        </Label><br />
        <Label htmlFor="photo_description">
          <legend>photo_description</legend>
          <Input
            type="textarea"
            name="photo_description"
            id="photo_photo_description"
            placeholder="Please enter details here"
            value={formState.photo_description}
            onChange={e => handleChange(e)}
          />
        </Label>
        <br />
        <Label htmlFor="photo_url">
          <legend>Image photo_url</legend>
          <Input
            type="url"
            name="photo_url"
            id="photo_url"
            placeholder="Please enter image URL here"
            value={formState.photo_url}
            onChange={e => handleChange(e)}
          />
        </Label>
        <Button type="submit"> Post </Button>
      </Form>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    // image: state.spotLight.photo_url
  }
}

export default connect(mapStateToProps, { addPost, editPost })(Edit)
