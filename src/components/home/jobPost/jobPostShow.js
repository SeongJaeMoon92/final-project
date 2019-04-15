import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {Button} from 'react-bootstrap'

import EditJobPost from  './editJobPost'
import Auth from '../../lib/auth'
import MessageModal from '../message/messageModal'

class JobPostShow extends React.Component {
  constructor(){
    super()

    this.state = { data: {}, deleteButton: false, deleteButtonShow: true}

    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
  }

  handleChangeMessage({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleDeleteButton(){
    this.setState({deleteButton: !this.state.deleteButton, deleteButtonShow: !this.state.deleteButtonShow})
  }

  handleSubmitMessage(e){
    e.preventDefault()
    const data = {...this.state.data, receiver_id: this.props.jobPost.owner.id}
    this.setState({data},
      () =>  {
        axios.post('/api/messages', this.state.data,
          { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
          .then((res) => this.setState({data: ''},() => console.log(res.data)))
          .catch(err => this.setState({errors: err.response.data}))
      }
    )
  }

  isOwner() {
    return Auth.isAuthenticated() && this.props.jobPost.owner.id === Auth.getPayload().sub
  }

  render(){
    const { deleteButton, deleteButtonShow } = this.state
    const {jobPost, handleLike, handleChange, data, errors, getPostInfo } = this.props
    return(
      <div className="showPage">
        <div className="">
          <div>Company : {jobPost.company}</div>
          <div>We are looking for <strong>{jobPost.job_title}</strong></div>
          <div>Content : {jobPost.post_content}</div>
          <img src={jobPost.post_image} alt={jobPost.job_title}/>
        </div>
        <hr />
        <div>Industries : </div>
          <div className="industriesList">
            {jobPost.industries.map((category, id) => (
              <div key={id} className="industries">{category.industry}</div>
            ))}
          </div>
        <hr />
        <div className="buttonsAndUser">
          <div>
          <Button
            name={jobPost.id}
            className="buttonColor"
            onClick={handleLike}
          >
          {jobPost.liked_by.length} Like(s)
          </Button>
          {!this.isOwner() && <MessageModal
            dataMessage={this.state.data}
            handleChange={this.handleChangeMessage}
            handleSubmit={this.handleSubmitMessage}
            data ={jobPost}
          />}
          {this.isOwner() && <EditJobPost
            id={jobPost.id}
            postInfo = {getPostInfo}
          />}
          {(this.isOwner() && deleteButton) &&
            <span>
              <Button variant="danger" className="animated fadeIn" value={jobPost.id} onClick={(e)=> {
                this.props.handleDelete(e)
                this.handleDeleteButton()
              }}>
              Confirm
              </Button>
              <Button className="buttonColor animated fadeIn" onClick={this.handleDeleteButton}>Cancel</Button>
            </span>
          }
          {(this.isOwner() && deleteButtonShow) &&
            <Button onClick={this.handleDeleteButton} variant="danger" className="animated fadeIn">Delete</Button>
          }
          </div>
          <div>by {jobPost.owner.username}</div>
        </div>
      </div>
    )
  }
}

export default withRouter(JobPostShow)
