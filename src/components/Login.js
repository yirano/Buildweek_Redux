import React, { useState, useEffect } from "react"
import * as yup from "yup"
// import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'
import { logIn } from '../Action/action'
import { Button, Form, Label, Input, legend } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const [serverError, setServerError] = useState("")

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  })

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(credentials)
    props.logIn(credentials)
    props.history.push('/albums')
  }

  //* Login Page Validation-REACT I

  const formSchema = yup.object().shape({
    username: yup.string().required("UserId is a required field"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(5, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z@]/),
  })

  useEffect(() => {
    console.log(
    )
    formSchema.isValid(credentials).then(isFormValid => {
      setButtonDisabled(!isFormValid)
    })
  }, [credentials])

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
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

    validateChange(e)
  }

  
  return (

    <Form onSubmit={handleLogin} >
      <h1>Welcome to Expat Journal!!</h1><br />
      <h5>If you're a new user, please register.</h5><br />
      <h5>If you've already registered, please login to view posts.</h5>
      {serverError ? <p className="error">{serverError}</p> : null}
      <Label for="userid">
        <legend>UserId</legend>
        <Input
          id="userid"
          type="text"
          name="username"
          placeholder="Please enter userid here"
          onChange={inputChange}
          value={credentials.username}

        />
        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
      </Label><br />
      <Label htmlFor="password">
        <legend>Password</legend>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Please enter password here"
          value={credentials.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </Label>
      <br />
          
      <Button type="submit" disabled={buttonDisabled} >Submit </Button>
    
      <Link to="/signup"><br />

        <Button type="submit">Register</Button>
      </Link>
    </Form>

  )
}

export default connect(null, { logIn })(Login)

