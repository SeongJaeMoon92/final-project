import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

import * as filestack from 'filestack-js'
const client = filestack.init(process.env.FILESTACK_KEY)

import Auth from '../../lib/auth'
import SocialPostForm from './socialPostForm'
import industriesOptions from '../data/industriesOptions'

class SocialPostNew extends React.Component {
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
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
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

  handleSelect(e){
    const arr = []
    e.forEach(val => {
      const industries = {id: parseInt(val.value), industry: val.label}
      arr.push(industries)
      const data = {...this.state.data, industries: arr }
      this.setState({data})
    })
  }

  handleDeleteObjectKey(){
    const key = ['industries']
    delete this.state.data[key]
    this.postAxios()
  }

  handleNestedObject(){
    if (!this.state.data.industries) {
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          industry_id: ''
        }
      }))
    } else {
      const newdata = this.state.data.industries.map(data => (
        {id: data.id}
      ))
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          industry_id: newdata
        }
      }))
    }
    setTimeout(() => {
      this.handleDeleteObjectKey()
    },200)
  }

  postAxios(){
    let post_image = ''
    let data = {...this.state.data}
    if (this.state.image) {
       post_image = this.state.image
      data = {...this.state.data, post_image}
    }
    console.log('posting data', data)
    axios.post('/api/social_posts', data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.setState({data: ''},() =>{
        if (this.fileInput.current) this.fileInput.current.select.clearValue()
        this.props.postInfo()
      }))
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleNestedObject()
    this.handleClose()
  }

  render() {
    return (
      <div className="my-2">
        <Button size="sm" variant="dark" onClick={this.handleShow}>
          Create a new post
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a New Social Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SocialPostForm
              selectRef={this.fileInput}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleSelect={this.handleSelect}
              data={this.state.data}
              errors={this.state.errors}
              industriesOptions={industriesOptions}
              handleImageUpload={this.handleImageUpload}
              imageUrl={this.state.image}
            />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default SocialPostNew
