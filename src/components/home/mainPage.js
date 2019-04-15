import React from 'react'
import {Button, Form} from 'react-bootstrap'
// import compoenents

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

  handlePost(e){
    this.setState({socialPost:!this.state.socialPost, jobPost: !this.state.jobPost})
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) })
  }

  render(){
    const {socialPost, jobPost} = this.state
    return (
      <main className="mainHomePage animated fadeIn">
        <div className="sidebar">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={this.state.search}
            onChange={this.handleSearch}
          / > 
          <SideProfile />
          <div>
          <Button className="buttonColor switchButton" onClick={this.handlePost}> Switch</Button>   
          </div>
        </div>
        {socialPost &&
          <SocialPostIndex
            search={this.state.search}
          />}
        {jobPost &&
          <JobPostIndex
            search={this.state.search}
          />}
      </main>
    )
  }
}

export default MainPage
