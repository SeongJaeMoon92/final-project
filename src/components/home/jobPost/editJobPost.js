import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Auth from '../../lib/auth'
import makeAnimated from 'react-select/lib/animated'
import industriesOptions from '../data/industriesOptions'
import {Modal, Button, ButtonToolbar} from 'react-bootstrap'
import JobPostForm from './jobPostForm'

class EditJobPost extends React.Component {
  constructor() {
    super()

    this.state = { show: false, data: {}, errors:{}}

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    console.log(this.state.data)
    console.log(e[e.length-1])
    const lastValue = e[e.length-1]
    const arr = []
    const newArr = arr.concat(lastValue)
    // const industry = [...this.state.data.industry_id, lastValue ]
    this.setState(prevState => ({...prevState, data: {...prevState.data, industry_id: newArr }}))
  }
// this.setState({ myArray: [...this.state.myArray, 'new value'] })
//   this.setState(prevState => ({
//     ...prevState,
//     someProperty: {
//         ...prevState.someProperty,
//         someOtherProperty: {
//             ...prevState.someProperty.someOtherProperty,
//             anotherProperty: {
//                ...prevState.someProperty.someOtherProperty.anotherProperty,
//                flag: false
//             }
//         }
//     }
// }))

  handleSubmit(e){
    // e.preventDefault()
    axios.put(`/api/job_posts/${this.props.id}`,
      this.state.data,
    { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.setState({show: false}, this.getPostInfo()))
      .catch(err => this.setState({errors: err.response.data}))
  }

  getPostInfo(){
    axios.get(`/api/job_posts/${this.props.id}`)
      .then(res => this.setState({data: res.data}))
      .catch(err => this.setState({ errors: err.response.data}))
  }
  //
  // componentDidMount(){
  //   this.getPostInfoAgain()
  // }

  // getPostInfoAgain(){
  //   axios.get(`/api/social_posts/${this.props.id}`)
  //     .then(res => {
  //
  //       const dataEdit = {industry_id: data.industries}
  //       console.log(dataEdit)
  //     })
  //     .catch(err => this.setState({ errors: err.response.data}))
  // }

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
            <Modal.Title>Job Post Edit</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <JobPostForm
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

// value={!data.industries || data.industries.map(data => (
//   {value: data.id, label: data.industry}))}
// <Button variant="primary" onClick={this.handleClose}>
//   Edit
// </Button>


export default EditJobPost