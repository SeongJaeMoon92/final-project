import React from 'react'
import {Button} from 'react-bootstrap'
// import compoenents

import SideProfile from  './sideProfile'
import SocialPostIndex from  './socialPost/socialPostIndex'
import JobPostIndex from  './jobPost/jobPostIndex'

class MainPage extends React.Component{
  constructor(){
    super()

    this.state = { socialPost: false, jobPost: true}

    this.handlePost = this.handlePost.bind(this)
  }

  handlePost(e){
    this.setState({socialPost:!this.state.socialPost, jobPost: !this.state.jobPost})
  }

  render(){
    const {socialPost, jobPost} = this.state
    return (
      <main className="mainHomePage">
        <div className="sidebar">
          <SideProfile />
          <div>
          <Button className="buttonColor switchButton" onClick={this.handlePost}> Switch</Button>   
          </div>   
        </div>
        {socialPost && <SocialPostIndex />}
        {jobPost && <JobPostIndex />}
      </main>
    )
  }
}

// <Button onClick={this.handlePost}> Switch to Social Post</Button>
export default MainPage
