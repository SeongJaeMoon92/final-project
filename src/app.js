import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch} from 'react-router-dom'

import './stylesheet/main.scss'
// import components

import Header from './components/common/header'
import Footer from './components/common/footer'
import MainPage from './components/home/mainPage'
import Register from './components/registerLogin/register'
import Login from './components/registerLogin/login'
import SecureRoute from './components/lib/secureRoute'
import NetworkIndex from './components/page/network/networkIndex'
import Profile from './components/page/profile/profile'
import ProfileCreate from './components/page/profile/profileCreate'
import Inbox from './components/inbox/inbox'

class App extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <Browser>
        <div className="mainPage">
          <Header />
          <Switch>
            <SecureRoute path='/inbox' component={Inbox} />
            <SecureRoute path='/profile/new' component={ProfileCreate} />
            <SecureRoute path='/profile/:id' component={Profile} />
            <SecureRoute path='/discover' component={NetworkIndex} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <SecureRoute exact path='/' component={MainPage} />
          </Switch>
          <Footer />
        </div>
      </Browser>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
