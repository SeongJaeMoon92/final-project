import React from 'react'
import axios from 'axios'
import * as filestack from 'filestack-js'
import { Container, Row } from 'react-bootstrap'

const client = filestack.init(process.env.FILESTACK_KEY)

import Auth from '../../lib/auth'
import ProfileForm from './profileForm'

class ProfileCreate extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      image: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e){
    e.preventDefault()
    const image = this.state.image
    const data = {...this.state.data, image}
    axios.post('/api/profiles', data,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push(`/profile/${Auth.getPayload().sub}`)
      })
      .catch(err => err.response && this.setState({errors: err.response.data}))
  }

  handleImageUpload() {
    const options = {
      fromSources: ['local_file_system','url','googledrive','dropbox','instagram','facebook'],
      accept: ['image/*'],
      onFileUploadFinished: file => {
        this.setState({ image: file.url })
      }
    }
    client.picker(options).open()
  }

  render(){
    return(
      <Container className="container-fluid my-3 container-min-height">
        <Row className="border-bottom border-secondary mb-4">
          <h2>Add profile</h2>
        </Row>
        <Row>
          <ProfileForm
            data={this.state.data}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleImageUpload={this.handleImageUpload}
            imageUrl={this.state.image}
          />
        </Row>
      </Container>
    )
  }
}

export default ProfileCreate
