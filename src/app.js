import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Link, Switch} from 'react-router-dom'

import './style.scss'
// import components

import Header from './components/common/header'
import MainPage from './components/home/mainPage'
import Register from './components/registerLogin/register'
import Login from './components/registerLogin/login'
import SecureRoute from './components/lib/secureRoute'
import Profile from './components/page/profile'

class App extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <Browser>
        <div>
          <Header />
          <Switch>
            <Route path='/profile/:id' component={Profile} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <SecureRoute exact path='/' component={MainPage} />
          </Switch>
        </div>
      </Browser>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
