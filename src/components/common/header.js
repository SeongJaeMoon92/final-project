import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { Navbar, Nav } from 'react-bootstrap'

import Auth from '../lib/auth'
import Notifications from '../lib/notification'


class Header extends React.Component{
  constructor(){
    super()

    this.state = {}

    this.logout = this.logout.bind(this)

    this.path = React.createRef()
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

  // getNotification(){
  //   const messages = Notifications.getNotification()
  //   console.log(messages, 'update')
  //   if (!messages) return false
  //
  //   this.setState({ messages })
  //   console.log(this.state.messages, 'update message')
  //   Notifications.clearNotification()
  //   setTimeout(() => this.setState({ messages: null }), 4000)
  // }

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
      <Navbar collapseOnSelect sticky="top" expand="lg" bg="secondary" variant="dark">
        <Navbar.Brand>
          <Link to="/">
            <img
              alt="JoinedUp"
              src="../assets/images/joinedup/joinedup_logo_white_small.png"
              height="30"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-joinedup" />
        <Navbar.Collapse id="navbar-joinedup" className="justify-content-end">
          <Nav>
            <Nav.Link href="/discover">Discover</Nav.Link>
            <Nav.Link ref={this.path} href="/inbox">Inbox</Nav.Link>
            <Nav.Link href={`/profile/${this.state.profileId}`}>My Profile</Nav.Link>
            <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Header)
