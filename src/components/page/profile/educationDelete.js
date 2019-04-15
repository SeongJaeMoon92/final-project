import React from 'react'
import axios from 'axios'
import { Button, ButtonToolbar, Modal } from 'react-bootstrap'

import Auth from '../../lib/auth'

class EducationDelete extends React.Component{
  constructor() {
    super()

    this.state = {
      showModal: false
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleDelete() {
    axios.delete(`/api/profiles/${this.props.profileId}/educations/${this.props.educationId}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.handleClose()
        this.props.getProfileData()
      })
      .catch(err => console.log(err))
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  render(){
    const { school } = this.props
    return(
      <div>
        <Button className="m-1 px-3" size="sm" variant="danger" onClick={this.handleShow}>
         Delete
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Education at {school}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your {school} education?</p>
            <p>This cannot be undone.</p>
            <ButtonToolbar>
              <Button className="m-1 px-3" variant="danger" onClick={this.handleDelete}>
              Delete
              </Button>
              <Button className="m-1 px-3" variant="secondary" onClick={this.handleClose}>
              Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default EducationDelete
