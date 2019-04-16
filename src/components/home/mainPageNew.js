import React from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'

import SideProfile from  './sideProfile'
import SocialPostIndex from  './socialPost/socialPostIndex'
import JobPostIndex from  './jobPost/jobPostIndex'

class MainPageNew extends React.Component{
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
      <Container className="container-min-height">
        <Row className="container-min-height py-3 align-items-center align-items-md-start">
          <Col xs={12} md={4} lg={3} className="d-flex flex-column align-items-center">
            <Button className="mb-3 d-none d-md-block" variant="primary" onClick={this.handlePost}>Switch {socialPost ? 'to Job Posts' : 'to Social Posts'}</Button>
            <SideProfile />
          </Col>
          <Col xs={12} md={8} lg={9} className="d-flex flex-column align-items-center">
            <Button className="my-3 d-block d-md-none" variant="primary" onClick={this.handlePost}>Switch {socialPost ? 'to Job Posts' : 'to Social Posts'}</Button>
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
      </Container>
    )
  }
}

export default MainPageNew


// <main className="mainHomePage animated fadeIn">
//   <div className="sidebar">
//     <Form.Control
//       type="text"
//       placeholder="Search by name"
//       value={this.state.search}
//       onChange={this.handleSearch}
//     / > 
//     <SideProfile />
//     <div>
//       <Button className="buttonColor switchButton" onClick={this.handlePost}> Switch</Button>   
//     </div>
//   </div>
//   {socialPost &&
//     <SocialPostIndex
//       search={this.state.search}
//     />}
//   {jobPost &&
//     <JobPostIndex
//       search={this.state.search}
//     />}
// </main>
