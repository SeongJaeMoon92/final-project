import React from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

import Auth from '../../lib/auth'

import NetworkProfile from './networkProfile'

class NetworkDiscover extends React.Component{
  constructor(){
    super()

    this.state = {
      search: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.getProfilesData()
  }

  getProfilesData() {
    // fetch used here instead of axios because axios returned incorrcct res.data
    fetch('/api/profiles')
      .then(res => res.json())
      .then(res => {
        const userProfile = res.filter(profile => (profile.owner.id === Auth.getPayload().sub))
        const profiles = res.filter(profile => (profile.owner.id !== Auth.getPayload().sub))
        console.log('user profile', userProfile)
        console.log('profiles', profiles)
        this.setState({ userProfile, profiles })
      })
  }

  getUserData() {
    axios.get(`/api/users/${Auth.getPayload().sub}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err))
  }



  handleSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) })
  }

  render(){
    if (!this.state.profiles || !this.state.userProfile) return null
    const filteredProfiles = this.state.profiles.filter(profiles => profiles.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    return(
      <div>
        <h1>Network</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={this.state.search}
          onChange={this.handleSearch}
        / >
        <Container>
          {filteredProfiles.map((profile, id) => (
            <Col key={id} md={4}>
              <NetworkProfile
                profile={profile}
                userProfile={this.state.userProfile}
              />
            </Col>
          ))}
        </Container>
      </div>
    )
  }
}

export default NetworkDiscover
