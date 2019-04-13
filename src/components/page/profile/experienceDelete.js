import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import Auth from '../../lib/auth'

class ExperienceDelete extends React.Component{
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
    axios.delete(`/api/profiles/${this.props.profileId}/experiences/${this.props.experienceId}`,
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
    const { jobTitle, company } = this.props
    return(
      <div>
        <Button variant="primary" onClick={this.handleShow}>
         Delete experience
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Experience at {company}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your {jobTitle} experience at {company}? This cannot be undone.</p>
            <Button variant="primary" onClick={this.handleDelete}>
             Delete experience
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ExperienceDelete


// <Button variant="primary" onClick={handleShow}>
//  Add new experience
// </Button>
//
// <Modal
//   show={this.state.show}
//   onHide={this.handleClose}
// >
//   <Modal.Header closeButton>
//     <Modal.Title>Modal heading</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <ExperienceUpdate
//       profileId={profileId}
//       getProfileData={this.getProfileData}
//     />
//   </Modal.Body>
// </Modal>
