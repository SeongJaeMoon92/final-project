import React from 'react'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'
import Auth from '../../lib/auth'

import ProfileForm from './profileForm'

class ProfileCreate extends React.Component{
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
    axios.post('/api/profiles', this.state.data,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push(`/profile/${Auth.getPayload().sub}`)
      })
      .catch(err => this.setState({errors: err.response}))
  }

  render(){
    return(
      <Container className="container-fluid my-3">
        <Row className="border-bottom border-secondary mb-4">
          <h2>Add profile</h2>
        </Row>
        <Row>
          <ProfileForm
            data={this.state.data}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Row>
      </Container>
    )
  }
}

export default ProfileCreate
