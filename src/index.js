import React from "react"
import ReactDOM from "react-dom"

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './Reducer/reducer'

import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
)
