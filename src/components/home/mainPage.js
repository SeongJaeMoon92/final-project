import React from 'react'
import { Row, Col, Button, Form} from 'react-bootstrap'

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

  handlePost(){
    this.setState({ socialPost: !this.state.socialPost, jobPost: !this.state.jobPost})
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) })
  }

  render(){
    const { socialPost, jobPost } = this.state
    return (
      <div className="mx-md-5 container-min-height animated fadeIn">
        <Row className="w-100 px-3 container-min-height py-3 align-items-center align-items-md-start">
          <Col xs={12} md={4} lg={3} className="d-flex flex-column align-items-center pt-md-4 mt-md-5">
            <Button className="mb-3 mb-md-4 d-none d-md-block" variant="info" onClick={this.handlePost}>Switch {socialPost ? 'to Job Posts' : 'to Social Posts'}</Button>
            <SideProfile />
          </Col>
          <Col xs={12} md={8} lg={9} className="d-flex flex-column align-items-center">
            <Button className="my-3 d-block d-md-none" variant="info" onClick={this.handlePost}>Switch {socialPost ? 'to Job Posts' : 'to Social Posts'}</Button>
            <h3 className="mb-3">{socialPost ? 'Social Posts' : 'Job Posts'}</h3>
            <Form.Control
              type="text"
              placeholder="Search posts by name"
              value={this.state.search}
              onChange={this.handleSearch}
            / >
            {socialPost &&
              <SocialPostIndex
                search={this.state.search}
              />}
            {jobPost &&
              <JobPostIndex
                search={this.state.search}
              />}
          </Col>
        </Row>
      </div>
    )
  }
}

export default MainPage
