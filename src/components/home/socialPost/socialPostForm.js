import React from 'react'
import axios from 'axios'

import SocialPostEdit from  './socialPostEdit'
import { withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import MessageModal from './messageModal'

class SocialPostForm extends React.Component {
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
    const data = {...this.state.data, receiver_id: this.props.socialPost.owner.id}
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
    return Auth.isAuthenticated() && this.props.socialPost.owner.id === Auth.getPayload().sub
  }

  render(){
  const { commentBox } = this.state
  const {socialPost, handleLike, handleChange, handleSubmit, data, errors } = this.props
  return(
    <div>
      <div>{socialPost.post_title}</div>
      <div>{socialPost.post_content}</div>
      <img src={socialPost.post_image} alt={socialPost.post_title}/>
      <div>{socialPost.industries.map(category => (
        category.industry
      ))}</div>
      <div>{socialPost.owner.username}</div>
      <div>{socialPost.liked_by.length}</div>
      <div>{socialPost.comments.map(comment => (
        `${comment.content} by ${comment.user.username}`
      ))}</div>
      <input
        type='button'
        name={socialPost.id}
        value='like'
        onClick={handleLike}
      />
      <button
        value={socialPost.id}
        onClick={this.handleCommentBox}>
        Comment
      </button>
      <MessageModal
        dataMessage={this.state.data}
        handleChange={this.handleChangeMessage}
        handleSubmit={this.handleSubmitMessage}
        socialPostData ={socialPost}
      />
      {this.isOwner() && <SocialPostEdit
        id={socialPost.id}
      />}
      {this.isOwner() && <button value={socialPost.id} onClick={this.props.handleDelete}>Delete</button>}
      {commentBox &&
        <form onSubmit={(e) => {
          handleSubmit(e, socialPost)
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

export default withRouter(SocialPostForm)
