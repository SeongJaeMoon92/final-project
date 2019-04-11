import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import EducationFrom from './educationForm'

class EducationCreate extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post(`/api/profiles/${this.props.match.params.id}/educations`, this.state.data,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push(`/profile/${this.props.match.params.id}`)
      })
      .catch(err => this.setState({errors: err.response}))
  }

  render(){
    return(
      <div>
        <h1>Add education.....</h1>
        <EducationFrom
          data={this.state.data}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default EducationCreate
