import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import ProfileForm from './profileForm'

class ProfileUpdate extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/profiles/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }


  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.put(`/api/profiles/${this.props.match.params.id}`, this.state.data,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push(`/profile/${this.props.match.params.id}`)
      })
      .catch(err => this.setState({errors: err.response}))
  }

  render(){
    return(
      <div>
        <h1>Update profile.....</h1>
        <ProfileForm
          data={this.state.data}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default ProfileUpdate
