import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/auth'
import axios from 'axios'

class Header extends React.Component{
  constructor(){
    super()

    this.state = {}

    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.setLocationInState()
    this.getProfileId()
  }

  componentDidUpdate() {
    if (this.state.previousLocation === this.props.history.location) return null
    this.getProfileId()
    this.setLocationInState()
  }

  setLocationInState() {
    this.setState({ previousLocation: this.props.history.location })
  }

  getProfileId() {
    if (Auth.getToken() === null) return null
    axios.get(`/api/users/${Auth.getPayload().sub}/profile`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ profileId: res.data.id }))
  }

  logout() {
    Auth.logout()
  }

  render() {
    if (!Auth.isAuthenticated()) return null
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/discover'>Discover</Link>
        <Link to={`/profile/${this.state.profileId}`}>My Profile</Link>
        <Link to='/' onClick={this.logout}>Logout</Link>
      </div>
    )
  }
}

export default withRouter(Header)
