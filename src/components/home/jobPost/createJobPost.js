import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'
import JobPostForm from './jobPostForm'

class JobPostNew extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {}}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSelect(e){
    const arr = []
    e.forEach(val => {
      const industries = {id: parseInt(val.value)}
      arr.push(industries)
      const data = {...this.state.data, industry_id: arr }
      this.setState({data})
    })
  }

  handleSubmit(e) {
    // e.preventDefault()
    axios.post('/api/job_posts',
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPostInfo())
      .catch(err => this.setState({ errors: err.response.data}))
  }

  getPostInfo(){
    axios.get('/api/job_posts')
      .then(res => this.setState({data: res.data}))
  }

  render() {
    return (
      <main>
        <JobPostForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleSelect={this.handleSelect}
          data={this.state.data}
          errors={this.state.errors}
        />
      </main>
    )
  }
}

export default JobPostNew
