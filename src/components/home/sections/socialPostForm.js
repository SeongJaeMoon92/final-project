import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class SocialPostForm extends React.Component {
  constructor(){
    super()

    this.state = {commentBox: false, messageBox: false}

    this.handleCommentBox = this.handleCommentBox.bind(this)
    this.handleMessageBox = this.handleMessageBox.bind(this)
  }

  handleCommentBox(e){
    this.setState({commentBox: !this.state.commentBox})
  }
  handleMessageBox(e){
    this.setState({messageBox: !this.state.messageBox})
  }

  render(){
  const { commentBox, messageBox } = this.state
  const {socialPost, handleLike, handleChange, handleSubmit, data, errors,dataM, handleChangeMessage, handleSubmitMessage } = this.props
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
      <button
        value={socialPost.id}
        onClick={this.handleMessageBox}>
      Message</button>
      <button>Edit</button>
      <button>Delete</button>
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
      {messageBox &&
        <form onSubmit={(e) => {
          handleSubmitMessage(e, socialPost)
          this.handleMessageBox()
        }}>
          <div>Message</div>
          <textarea
            name='message_content'
            onChange={handleChangeMessage}
            value={dataM.message_content || ''}
          />
          <button>submit</button>
        </form>
      }
      <hr />
    </div>
  )
  }
}


export default SocialPostForm
