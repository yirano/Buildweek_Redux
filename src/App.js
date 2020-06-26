import React from 'react'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Button, Navbar } from 'reactstrap'
import { connect } from 'react-redux'

import PrivateRoute from './Components/PrivateRoute'
import { logOut } from './Action/action'

import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Posts from './Components/Posts'
import Albums from './Components/Albums'
import Photos from './Components/Photos'
import Photo from './Components/Photo'
import Edit from './Components/Edit'
import AddAlbum from './Components/AddAlbum'

import './App.css'



function App(props) {
  const logOut = () => {
    props.logOut()
    alert("Thanks for visiting Expat Journal!")
  }

  return (
    <Router>
      <header className="nav">
        {localStorage.getItem('token') === null ?
          <a href="https://xpatjournal.netlify.app/">
            <Button>Home</Button>
          </a>
          : <Link to="/albums">
            <Button>Albums</Button>
          </Link>
        }

        {localStorage.key('token') !== null ?
          <Link to="/addalbum">
            <Button>New Album</Button>
          </Link>
          : null
        }

        {localStorage.getItem('token') === null ?
          <Link to="/login">
            <Button>Login</Button>
          </Link> :
          <Link to="/login">
            <Button onClick={logOut}>LogOut</Button>

          </Link>
        }
      </header>

      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/:id1/edit/:id2" component={Edit} />
        <Route path="/albums/:id" component={Photos} />
        <Route path="/albums" component={Albums} />
        <Route exact path="/photo/:id" component={Photo} />

        <PrivateRoute path="/album/:id/post" component={Posts} />
        <PrivateRoute exact path="/addalbum" component={AddAlbum} />
        <PrivateRoute exact path="/album/edit/:id" component={AddAlbum} />
      </Switch>
    </Router>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.isLoggedIn,
    spotLight: state.spotLight
  }
}

export default connect(mapStateToProps, { logOut })(App)
