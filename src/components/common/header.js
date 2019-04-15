import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/auth'
import axios from 'axios'
import { Navbar, Nav } from 'react-bootstrap'

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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">
              <img
                alt=""
                src="../../assets/images/link-512.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {' Joined Up'}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav entireNavbarHeader">
            <Nav className="navbarHeader">
              <Nav.Item className="navbarHeaderItem">
                <Link to='/inbox'>Inbox</Link>
              </Nav.Item>
              <Nav.Item className="navbarHeaderItem">
                <Link to='/discover'>Discover</Link>
              </Nav.Item>
              <Nav.Item className="navbarHeaderItem">
                <Link to={`/profile/${this.state.profileId}`}>My Profile</Link>
              </Nav.Item>
              <Nav.Item className="navbarHeaderItem">
                <Link to='/' onClick={this.logout}>Logout</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(Header)
