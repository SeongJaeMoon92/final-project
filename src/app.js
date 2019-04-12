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
import Network from './components/page/network'
import Profile from './components/page/profile/profile'
import ProfileCreate from './components/page/profile/profileCreate'
import ProfileUpdate from './components/page/profile/profileUpdate'
import ExperienceCreate from './components/page/profile/experienceCreate'
import ExperienceUpdate from './components/page/profile/experienceUpdate'
import EducationCreate from './components/page/profile/educationCreate'
import EducationUpdate from './components/page/profile/educationUpdate'
import SocialPostNew from './components/home/socialPost/createSocialPost'

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
            <SecureRoute path='/social_post/new' component={SocialPostNew}/>
            <SecureRoute path='/profile/:id/education/:educationId' component={EducationUpdate} />
            <SecureRoute path='/profile/:id/education' component={EducationCreate} />
            <SecureRoute path='/profile/:id/experience/:experienceId' component={ExperienceUpdate} />
            <SecureRoute path='/profile/:id/experience' component={ExperienceCreate} />
            <SecureRoute path='/profile/:id/update' component={ProfileUpdate} />
            <SecureRoute path='/profile/add' component={ProfileCreate} />
            <SecureRoute path='/profile/:id' component={Profile} />
            <SecureRoute path='/network' component={Network} />
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
