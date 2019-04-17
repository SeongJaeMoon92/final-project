import React from 'react'
import axios from 'axios'
import * as filestack from 'filestack-js'
import { Button, Modal } from 'react-bootstrap'

const client = filestack.init(process.env.FILESTACK_KEY)

import Auth from '../../lib/auth'
import ProfileForm from './profileForm'

class ProfileUpdate extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      showModal: false,
      image: ''
    }

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  componentDidMount() {
    this.setState({ data: this.props.data})
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
    axios.put(`/api/profiles/${this.props.profileId}`, this.state.data,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.handleClose()
        this.props.getProfileData()
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
      <div>
        <Button className="m-2 px-3" size="sm" variant="info" onClick={this.handleShow}>
         Edit profile
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfileForm
              data={this.state.data}
              errors={this.state.errors}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleImageUpload={this.handleImageUpload}
              imageUrl={this.state.image}
            />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ProfileUpdate
