import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

import Auth from '../../lib/auth'

import ExperienceForm from './experienceForm'

class ExperienceCreate extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      showModal: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post(`/api/profiles/${this.props.profileId}/experiences`, this.state.data,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.handleClose()
        this.props.getProfileData()
        console.log('on submit', this.state)
      })
      .catch(err => err.response && this.setState({errors: err.response.data}))
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  render(){
    return(
      <div>
        <Button variant="primary" onClick={this.handleShow}>
         Add new experience
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExperienceForm
              data={this.state.data}
              errors={this.state.errors}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Modal.Body>
        </Modal>




      </div>
    )
  }
}

export default ExperienceCreate
