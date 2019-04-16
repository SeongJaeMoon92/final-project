import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import {Modal, Button} from 'react-bootstrap'
import JobPostForm from './jobPostForm'

import industriesOptions from '../data/industriesOptions'

class EditJobPost extends React.Component {
  constructor() {
    super()

    this.state = { show: false, data: {}, errors: {}}

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()

    this.handleIndustriesOptions()
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true  })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSelect(e, actionMeta){
    if (actionMeta.action === 'remove-value') {
      const remove = this.state.data.industries.filter(industry => industry.id !== actionMeta.removedValue.value)
      this.setState(prevState => ({...prevState, data: {...prevState.data, industries: remove }}))
    } else if (actionMeta.action === 'select-option') {
      let lastValue = e[e.length-1]
      lastValue = {id: parseInt(lastValue.value), industry: lastValue.label}
      const industry = [...this.state.data.industries, lastValue ]
      this.setState(prevState => ({...prevState, data: {...prevState.data, industries: industry }}))
    } else if (actionMeta.action === 'clear') {
      this.state.data.industries = []
    }
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

  getPostInfo(){
    axios.get(`/api/job_posts/${this.props.id}`)
      .then(res => this.setState({data: res.data}))
      .then(()=> {
        if (!this.state.data) return null
        const { industries } = this.state.data
        return industries
      })
      .then(res => {
        this.fileInput.current.state.value = res.map(data => (
          {value: data.id, label: data.industry}))
        return this.fileInput.current.state.value
      })
      .then(res =>{
        let newArr = this.state.industriesOptions
        for (let arr in res){
          newArr = newArr.filter(el =>{
            return parseInt(el.value) !== (res[arr].value)
          })
        }
        return newArr
      })
      .then(res => this.setState({options:res}))
      .catch(err => {
        this.setState({ errors: err.response.data})
      })
  }

  postAxios(){
    const data = {...this.state.data}
    this.setState({newData: data}, () => {
      const key = ['owner']
      const key1 = ['liked_by']
      delete this.state.newData[key]
      delete this.state.newData[key1]
    })
    axios.put(`/api/job_posts/${this.props.id}`,
      this.state.newData,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.setState({show: false},() =>{
          this.props.postInfo()
        })
      })
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleNestedObject()
  }

  handleIndustriesOptions(){
    this.state.industriesOptions = industriesOptions
  }

  render() {
    const {data, errors, options} = this.state
    return (
      <>
        <Button className="buttonColor" onClick={this.handleShow}>
         Edit
        </Button>

        <Modal
          show={this.state.show}
          onShow={() =>{
            this.getPostInfo()
          }}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Job Post Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobPostForm
              selectRef={this.fileInput}
              data={data}
              errors={errors}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleSelect={this.handleSelect}
              industriesOptions={options}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default EditJobPost
