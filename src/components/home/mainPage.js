import React from 'react'
import axios from 'axios'
import { Row, Col, Button, Form} from 'react-bootstrap'

import Auth from '../lib/auth'
import SideProfile from  './sideProfile'
import SocialPostIndex from  './socialPost/socialPostIndex'
import JobPostIndex from  './jobPost/jobPostIndex'

class MainPage extends React.Component{
  constructor(){
    super()

    this.state = { socialPost: false, jobPost: true, search: ''}

    this.handlePost = this.handlePost.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ profile: res.data.user_profile }))
  }

  handlePost(){
    this.setState({ socialPost: !this.state.socialPost, jobPost: !this.state.jobPost})
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) })
  }

  render(){
    const { socialPost, jobPost, profile } = this.state
    if (!profile) return null
    return (
      <div className="mx-md-5 container-min-height pb-md-1 animated fadeIn">
        <Row className="px-3 container-min-height py-3 align-items-center align-items-md-start">
          <Col xs={12} md={4} lg={3} className="d-flex flex-column align-items-center pt-md-4 mt-md-5">
            <Button className="mb-3 mb-md-4 d-none d-md-block" variant="info" onClick={this.handlePost}>Switch {socialPost ? 'to Job Posts' : 'to Social Posts'}</Button>
            <SideProfile />
          </Col>
          <Col xs={12} md={8} lg={9} className="d-flex flex-column align-items-center">
            <Button className="my-3 d-block d-md-none" variant="info" onClick={this.handlePost}>Switch {socialPost ? 'to Job Posts' : 'to Social Posts'}</Button>
            <h3 className="mb-3">{socialPost ? 'Social Posts' : 'Job Posts'}</h3>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Search posts by name"
              value={this.state.search}
              onChange={this.handleSearch}
            / >
            {socialPost &&
              <SocialPostIndex
                search={this.state.search}
                profile={this.state.profile}
              />}
            {jobPost &&
              <JobPostIndex
                search={this.state.search}
                profile={this.state.profile}
              />}
          </Col>
        </Row>
      </div>
    )
  }
}

export default MainPage
