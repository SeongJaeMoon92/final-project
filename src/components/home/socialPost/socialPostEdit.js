import React from 'react'
import axios from 'axios'
import Select from 'react-select';
import Auth from '../../lib/auth'
import makeAnimated from 'react-select/lib/animated'
import industriesOptions from './industriesOptions'
import {Modal, Button, ButtonToolbar} from 'react-bootstrap'

class SocialPostEdit extends React.Component {
  constructor() {
    super()

    this.state = { show: false, data: {}, errors:{} }

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
    const arr = []
    e.forEach(val => {
      const industries = {id: parseInt(val.value)}
      arr.push(industries)
      const data = {...this.state.data, industry_id: arr }
      this.setState({data})
    })
  }

  handleSubmit(e){
    // e.preventDefault()
    axios.put(`/api/social_posts/${this.props.id}`,
      this.state.data,
    { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.setState({show: false}, this.getPostInfo()))
      .catch(err => this.setState({errors: err.response.data}))
  }

  getPostInfo(){
    axios.get(`/api/social_posts/${this.props.id}`)
      .then(res => this.setState({data: res.data}))
      .catch(err => this.setState({ errors: err.response.data}))
  }

  componentDidMount(){
    this.getPostInfoAgain()
  }

  getPostInfoAgain(){
    axios.get(`/api/social_posts/${this.props.id}`)
      .then(res => {
        const data = {...this.state.data, data: res.data}
        const dataEdit = {industry_id: data.industries}
        console.log(dataEdit)
      })
      .catch(err => this.setState({ errors: err.response.data}))
  }

  render() {
    const {data, errors} = this.state
    // console.log(data);
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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <label htmlFor="post_title">Title</label>
              <input
                name="post_title"
                id="post_title"
                placeholder='Post title'
                onChange={this.handleChange}
                value={data.post_title || ''}
              />
              {errors.post_title && <small>{errors.post_title}</small>}
              <label htmlFor="post_content">Content</label>
              <input
                name="post_content"
                id="post_content"
                onChange={this.handleChange}
                value={data.post_content || ''}
              />
              {errors.post_content && <small>{errors.post_content}</small>}
              <label htmlFor="post_image">Image</label>
              <input
                name="post_image"
                id="post_image"
                placeholder="post_image"
                onChange={this.handleChange}
                value={data.post_image || ''}
              />
              <label htmlFor="industries">Industries</label>
              <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                options={industriesOptions}
                onChange={this.handleSelect}
                value={!data.industries || data.industries.map(data => (
                  {value: data.id, label: data.industry}))}
              />
            </Modal.Body>
            <Modal.Footer>
              <button>send</button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    )
  }
}

// <Button variant="primary" onClick={this.handleClose}>
//   Edit
// </Button>


export default SocialPostEdit
