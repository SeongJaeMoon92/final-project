import axios from 'axios'
import React from 'react'

import Auth from '../../lib/auth'
import JobPostShow from './jobPostShow'
import JobPostNew from './createJobPost'

class JobPostIndex extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {}}

    this.handleLike = this.handleLike.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getPostInfo = this.getPostInfo.bind(this)
  }

  componentDidMount() {
    this.getPostInfo()
  }

  getPostInfo(){
    axios.get('/api/job_posts')
      .then(res => this.setState({jobPosts: res.data}))
  }

  handleLike(e) {
    e.preventDefault()
    axios.put(`/api/job_posts/${e.target.name}/like`, {},
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPostInfo())
      .catch(err => console.log(err.response))
  }

  handleDelete(e){
    axios.delete(`/api/job_posts/${e.target.value}`,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPostInfo())
  }

  render(){
    if (!this.state.jobPosts) return null
    const {jobPosts} = this.state
    const filteredJobPost = jobPosts.filter(post => post.company.toLowerCase().indexOf(this.props.search.toLowerCase())!== -1)
    return(
      <div className="d-flex mx-3 animated fadeIn">
        <div className="mr-2 d-flex flex-column align-items-center">
          <JobPostNew
            postInfo={this.getPostInfo}
          />
          <div className="post-wrapper-height-overflow bg-white rounded p-2">
            {filteredJobPost && filteredJobPost.sort((a,b) => {
              if (a.id < b.id) return 1
              return -1
            }).map((jobPost,id) => (
              <div key={id} className="p-1 m-2 mb-1 border-bottom border-dark">
                <JobPostShow
                  getPostInfo = {this.getPostInfo}
                  jobPost = {jobPost}
                  handleLike = {this.handleLike}
                  handleDelete = {this.handleDelete}
                  data = {this.state.data}
                  errors = {this.state.errors}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default JobPostIndex
