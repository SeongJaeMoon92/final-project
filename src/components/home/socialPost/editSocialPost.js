import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Auth from '../../lib/auth'
import makeAnimated from 'react-select/lib/animated'
import industriesOptions from '../data/industriesOptions'
import {Modal, Button, ButtonToolbar} from 'react-bootstrap'
import SocialPostForm from './socialPostForm'

class EditSocialPost extends React.Component {
  constructor() {
    super()

    this.state = { show: false, data: {}, errors:{}}

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSelect(e){
    // console.log(e[e.length-1], 'last value in the array')
    let lastValue = e[e.length-1]
    lastValue = {id: parseInt(lastValue.value), industry: lastValue.label}
    const arr = []
    const newArr = arr.concat(lastValue)
    const industry = [...this.state.data.industries, lastValue ]
    this.setState(prevState => ({...prevState, data: {...prevState.data, industries: industry }}))
  }

  handleDeleteObjectKey(){
    // console.log(this.state.data, 'handleDelete');
    const key = ['industries']
    delete this.state.data[key]
    this.postAxios()
  }

  handleNestedObject(){
    console.log(this.state.data.industries, 'handleNestedObject');
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
      setTimeout(() => {
        this.handleDeleteObjectKey()
     },200)
  }

  getPostInfo(){
    axios.get(`/api/social_posts/${this.props.id}`)
      .then(res => this.setState({data: res.data}))
      .then(()=> {
        if (!this.state.data) return null
        const { industries } = this.state.data
        // console.log(industries, 'industries one')
        return industries
      })
      .then(res => {
        // console.log(res, 'res two')
        this.fileInput.current.state.value = res.map(data => (
          {value: data.id, label: data.industry}))
      })
      .catch(err => {
        // console.log(err.response)
        this.setState({ errors: err.response.data})
      })
  }

  postAxios(){
    axios.put(`/api/social_posts/${this.props.id}`,
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then((res) => {
        // console.log(res, 'post axios')
        this.setState({show: false},(res) =>{
        // console.log(res, 'Post axios')
        // console.log(this.state.data, 'axios post')
        // console.log(this.fileInput, 'fileInput')
        // this.fileInput.current.select.clearValue()
        this.props.postInfo()
      })})
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleNestedObject()
  }
  render() {
    const {data, errors} = this.state
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
         Edit
        </Button>

        <Modal
          show={this.state.show}
          onShow={() =>{
            this.getPostInfo()
          }}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Social Post Edit</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <SocialPostForm
                selectRef={this.fileInput}
                data={data}
                errors={errors}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleSelect={this.handleSelect}
              />
            </Modal.Body>
        </Modal>
      </>
    )
  }
}


export default EditSocialPost
