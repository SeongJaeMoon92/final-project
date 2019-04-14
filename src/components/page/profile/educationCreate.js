import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

import Auth from '../../lib/auth'

import EducationForm from './educationForm'

class EducationCreate extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      showModal: false
    }

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post(`/api/profiles/${this.props.profileId}/educations`, this.state.data,
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
        <Button variant="primary" onClick={this.handleShow}>
         Add new education
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Education</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EducationForm
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

export default EducationCreate
