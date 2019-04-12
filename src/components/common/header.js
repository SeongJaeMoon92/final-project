import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/auth'
import axios from 'axios'

class Header extends React.Component{
  constructor(){
    super()

    this.state = {}
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
    axios.get(`/api/users/${Auth.getPayload().sub}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ profileId: res.data.id }))
  }

  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        {!Auth.isAuthenticated() && <Link to={`/profile/${this.state.profileId}`}>My profile</Link>}
      </div>
    )
  }
}

export default withRouter(Header)
