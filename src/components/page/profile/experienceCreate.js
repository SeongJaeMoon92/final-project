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
      showModal: false,
      endDate: false
    }

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleEndDate(){
    this.setState({ endDate: true })
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
      })
      .catch(err => err.response && this.setState({errors: err.response.data}))
  }

  render(){
    return(
      <div>
        {this.props.isOwner() &&
          <Button size="sm" variant="primary" onClick={this.handleShow}>
            Add new experience
          </Button>
        }
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
              endDate={this.state.endDate}
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
