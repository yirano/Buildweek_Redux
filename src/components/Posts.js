import React, { useState, useEffect } from 'react'
import { Form, Label, Input, Button, Dropdown } from 'reactstrap'
import * as yup from 'yup'
import { addPost, loadAlbums } from '../Action/action'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components'

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5% 0;
  `


const Posts = (props) => {
  const param = useParams().id
  const [serverError, setServerError] = useState("")
  const [formState, setFormState] = useState({
    photo_title: "",
    photo_description: "",
    photo_url: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [errors, setErrors] = useState({
    photo_title: "",
    photo_description: "",
    photo_url: ""
  })
  const formSchema = yup.object().shape({
    photo_title: yup.string().required("Title is a required field"),
    photo_description: yup.string().required("Description is a required fiels"),
    photo_url: yup.string().required("Please enter a valid URL").matches(/[https://]/)
  })

  const formSubmit = e => {
    e.preventDefault()

    console.log(formState)
    props.addPost(formState, param)
    setFormState({
      photo_title: "",
      photo_description: "",
      photo_url: ""
    })
    props.history.push(`/albums/${param}`)
  }
  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value) // value in input
      .then(inputIsValid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        })
      })
  }
  const inputChange = e => {
    e.persist()

    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.value
    }

    validateChange(e)
    setFormState(newFormData)
  }

  useEffect(() => {
    formSchema.isValid(formState).then(isFormValid => {
      setButtonDisabled(!isFormValid) // disabled= false if form is valid
    })
  }, [formState])


  return (
    <StyledForm>
      <h1>Share a Photo</h1>
      <Form onSubmit={formSubmit}>
        {serverError ? <p className="error">{serverError}</p> : null}
        <Label for="photo_title">
          <legend>Title</legend>
          <Input
            id="photo_title"
            type="text"
            name="photo_title"
            onChange={inputChange}
            value={formState.photo_title}
          />
          {errors.photo_title === '' ? <p className="error">{errors.photo_title}</p> : null}
        </Label><br />
        <Label htmlFor="photo_description">
          <legend>Photo Description</legend>
          <Input
            type="textarea"
            name="photo_description"
            id="photo_description"
            placeholder="Please enter details here"
            value={formState.photo_description}
            onChange={inputChange}
          />
          {errors.photo_description === '' ? (
            <p className="error">{errors.photo_description}</p>
          ) : null}
        </Label>
        <br />
        <Label htmlFor="photo_url">
          <legend>Image Photo URL</legend>
          <Input
            type="url"
            name="photo_url"
            id="photo_url"
            placeholder="Please enter image URL here"
            value={formState.photo_url}
            onChange={inputChange}
          />
          {errors.photo_url.length > 0 ? (
            <p className="error">{errors.photo_url}</p>
          ) : null}
        </Label>
        <br />

        <Button type="submit" disabled={buttonDisabled}> Post </Button>
      </Form>
    </StyledForm>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    albums: state.albumData
  }
}

export default connect(mapStateToProps, { addPost, loadAlbums })(Posts)