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
      <main>
        <SideProfile />
        <hr />
        {socialPost &&
          <div>
            <Button onClick={this.handlePost}> Switch to Job Post</Button>
            <h1>Social Post</h1>
            <SocialPostIndex />
          </div>}
        {jobPost &&
          <div>
            <Button onClick={this.handlePost}> Switch to Social Post</Button>
            <h1>Job Post</h1>
            <JobPostIndex />
          </div>}
      </main>
    )
  }
}

export default MainPage
