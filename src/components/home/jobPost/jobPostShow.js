import React from 'react'
import axios from 'axios'

import EditJobPost from  './editJobPost'
import { withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import MessageModal from '../message/messageModal'

class JobPostShow extends React.Component {
  constructor(){
    super()

    this.state = {commentBox: false, messageBox: false, data: {}}

    this.handleCommentBox = this.handleCommentBox.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
  }

  handleCommentBox(e){
    this.setState({commentBox: !this.state.commentBox})
  }

  handleChangeMessage({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmitMessage(e){
    e.preventDefault()
    const data = {...this.state.data, receiver_id: this.props.jobPost.owner.id}
    this.setState({data},
      () =>  {
        axios.post(`/api/messages`, this.state.data,
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
  const { commentBox } = this.state
  const {jobPost, handleLike, handleChange, handleSubmit, data, errors, getPostInfo } = this.props
  return(
    <div>
      <div>{jobPost.company}</div>
      <div>{jobPost.job_tile}</div>
      <div>{jobPost.post_content}</div>
      <img src={jobPost.post_image} alt={jobPost.job_title}/>
      <div>{jobPost.industries.map(category => (
        category.industry
      ))}</div>
      <div>{jobPost.owner.username}</div>
      <div>{jobPost.liked_by.length}</div>
      <input
        type='button'
        name={jobPost.id}
        value='like'
        onClick={handleLike}
      />
      <button
        value={jobPost.id}
        onClick={this.handleCommentBox}>
        Comment
      </button>
      <MessageModal
        dataMessage={this.state.data}
        handleChange={this.handleChangeMessage}
        handleSubmit={this.handleSubmitMessage}
        data ={jobPost}
      />
      {this.isOwner() && <EditJobPost
        id={jobPost.id}
        postInfo = {getPostInfo}
      />}
      {this.isOwner() && <button value={jobPost.id} onClick={this.props.handleDelete}>Delete</button>}
      {commentBox &&
        <form onSubmit={(e) => {
          handleSubmit(e, jobPost)
          this.handleCommentBox()
        }}>
          <div>Comment</div>
          <textarea
            name='content'
            onChange={handleChange}
            value={data.content || ''}
          />
          <button>submit</button>
        </form>
      }
      <hr />
    </div>
  )
  }
}

export default withRouter(JobPostShow)
