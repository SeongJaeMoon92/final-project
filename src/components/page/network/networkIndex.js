import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Form } from 'react-bootstrap'

import Auth from '../../lib/auth'

import ProfileRequired from '../../common/profileRequired'
import NetworkProfile from './networkProfile'

class NetworkIndex extends React.Component{
  constructor(){
    super()

    this.state = {
      search: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.requestConnection = this.requestConnection.bind(this)
    this.approveConnection = this.approveConnection.bind(this)
    this.isConnection = this.isConnection.bind(this)
    this.isPendingReceived = this.isPendingReceived.bind(this)
    this.isPendingSent = this.isPendingSent.bind(this)
  }

  componentDidMount() {
    this.getProfilesData()
    this.getConnectionData()
  }

  getProfilesData() {
    // fetch used here instead of axios because axios returned incorrcct res.data
    fetch('/api/profiles')
      .then(res => res.json())
      .then(res => {
        const userProfile = res.filter(profile => (profile.owner.id === Auth.getPayload().sub))[0]
        const otherProfiles = res.filter(profile => (profile.owner.id !== Auth.getPayload().sub))
        console.log('user profile', userProfile)
        console.log('profiles', otherProfiles)
        this.setState({ userProfile, otherProfiles })
      })
  }

  getConnectionData() {
    axios.get(`/api/users/${Auth.getPayload().sub}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => {
        const receivedRequests = res.data.received_friend_requests
        const sentRequests = res.data.sent_friend_requests
        const allRequests = receivedRequests.concat(sentRequests)
        const userData = res.data
        this.setState({ allRequests, userData })
      })
      .catch(err => console.log(err))
  }


  isConnection(profile) {
    const pos = this.state.allRequests.map(request => request.friend_a ? request.friend_a.id : request.friend_b.id).indexOf(profile.owner.id)
    if (pos === -1) return false
    if (this.state.allRequests[pos].status !== 'Accepted') return false
    return this.state.allRequests[pos]
  }


  isPendingReceived(profile) {
    const pos = this.state.allRequests.map(request => request.friend_a ? request.friend_a.id : '').indexOf(profile.owner.id)
    if (pos === -1) return false
    if (this.state.allRequests[pos].status !== 'Requested') return false
    return this.state.allRequests[pos]
  }

  isPendingSent(profile) {
    const pos = this.state.allRequests.map(request => request.friend_b ? request.friend_b.id : '').indexOf(profile.owner.id)
    if (pos === -1) return false
    if (this.state.allRequests[pos].status !== 'Requested') return false
    return this.state.allRequests[pos]
  }


  requestConnection(e) {
    axios.post('/api/friends', { friend_b_id: e.target.value},
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(() => this.getConnectionData())
      .catch(err => console.log(err))
  }


  approveConnection(e) {
    axios.put(`/api/friends/${e.target.value}`, { status: 'Accepted'},
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(() => this.getConnectionData())
      .catch(err => console.log(err))
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) })
  }

  render(){
    const { userProfile, otherProfiles, allRequests, search } = this.state
    if (!userProfile) return <ProfileRequired/>
    if (!otherProfiles || !allRequests) return null
    const filteredProfiles = otherProfiles.filter(profiles => profiles.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    return(
      <Container className="container-fluid my-3 container-min-height">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={10}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={this.handleSearch}
            / >
          </Col>
        </Row>
        <Container>
          <Row>
            {filteredProfiles.map((profile, id) => (
              <Col key={id} xs={6} sm={6} md={4} lg={3}>
                <NetworkProfile
                  profile={profile}
                  ownerId={profile.owner.id}
                  isConnection={this.isConnection}
                  isPendingReceived={this.isPendingReceived}
                  isPendingSent={this.isPendingSent}
                  requestConnection={this.requestConnection}
                  approveConnection={this.approveConnection}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    )
  }
}

export default NetworkIndex
