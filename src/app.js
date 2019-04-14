import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch} from 'react-router-dom'

import './stylesheet/main.scss'
// import components

import Header from './components/common/header'
import MainPage from './components/home/mainPage'
import Register from './components/registerLogin/register'
import Login from './components/registerLogin/login'
import SecureRoute from './components/lib/secureRoute'
import NetworkDiscover from './components/page/network/networkDiscover'
import Profile from './components/page/profile/profile'
import ProfileCreate from './components/page/profile/profileCreate'
import ProfileUpdate from './components/page/profile/profileUpdate'
import Inbox from './components/inbox/inbox'

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
            <SecureRoute path='/inbox' component={Inbox} />
            <SecureRoute path='/profile/:id/update' component={ProfileUpdate} />
            <SecureRoute path='/profile/add' component={ProfileCreate} />
            <SecureRoute path='/profile/:id' component={Profile} />
            <SecureRoute path='/discover' component={NetworkDiscover} />
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
