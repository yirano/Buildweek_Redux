import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Form, Label, Input, Button } from 'reactstrap'
import * as yup from 'yup'
import Axios from 'axios'

const SignUp = (props) => {

  const [serverError, setServerError] = useState("")

  const [formState, setFormState] = useState({
    username: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  })

  const formSchema = yup.object().shape({
    username: yup.string().required("username must be of min  6 chars").min(6),
    password: yup.string().required("Password must be of min 8chars").min(8),
  })

  useEffect(() => {
    formSchema.isValid(formState).then(isFormValid => {
      setButtonDisabled(!isFormValid) // disabled= false if form is valid
    })
  }, [formState])

  const formSubmit = e => {
    e.preventDefault()
    console.log(formState)
    Axios.post('https://expat-journal2.herokuapp.com/api/auth/register', formState).then(res => console.log(res))
      .catch(err => console.log('Error signing up --> ', err.response))
    setFormState({
      username: "",
      password: ""
    })
    props.history.push('/login')

  }

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
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


  return (
    <Form onSubmit={formSubmit}>
      <h1>Welcome to Expat Journal Registration Page!!</h1><br />
      <h5>Please register yourself to enjoy Expat Journal</h5><br />
      
      {serverError ? <p className="error">{serverError}</p> : null}
      <br />
      <Label htmlFor="username">
        <legend>User ID</legend>
        <Input
          type="text"
          name="username"
          id="userid"
          placeholder="Please enter username here"
          value={formState.username}
          onChange={inputChange}
        />
        {errors.username.length > 0 ? (
          <p className="error">{errors.username}</p>
        ) : null}
      </Label>
      <br />
      <Label htmlFor="password">
        <legend>Password</legend>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Please enter your password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </Label>
      <br />
      <Button type="submit" disabled={buttonDisabled}>Submit </Button>
    </Form>
  )
}


export default SignUp