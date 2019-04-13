import axios from 'axios'
import React from 'react'

import Auth from '../../lib/auth'
import JobPostShow from './jobPostShow'

class JobPostIndex extends React.Component {
  constructor() {
    super()

    this.state = { data:{}, errors:{}}

    this.handleLike = this.handleLike.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e, jobPost){
    e.preventDefault()
    axios.post(`/api/job_posts/${jobPost.id}/comments`,  this.state.data,
    { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.setState({data: ''}, this.getPostInfo()))
      .catch(err => this.setState({errors: err.response.data}))
  }

  handleDelete(e){
    axios.delete(`/api/job_posts/${e.target.value}`,
    { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPostInfo())
  }

  render(){
    const {jobPosts} = this.state
    return(
      <div className="postform">
        {jobPosts && jobPosts.sort((a,b) => {
          if (a.id > b.id) return 1
          return -1
        }).map((jobPost,id) => (
          <div key={id}>
            <JobPostShow
              getPostInfo = {this.getPostInfo}
              jobPost = {jobPost}
              handleLike = {this.handleLike}
              handleChange = {this.handleChange}
              handleSubmit = {this.handleSubmit}
              handleDelete = {this.handleDelete}
              data = {this.state.data}
              errors = {this.state.errors}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default JobPostIndex
