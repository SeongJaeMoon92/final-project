import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import EditSocialPost from  './editSocialPost'
import Auth from '../../lib/auth'
import MessageModal from '../message/messageModal'

class SocialPostShow extends React.Component {
  constructor(){
    super()

    this.state = {commentBox: false, deleteButton: false, deleteButtonShow: true, data: {}}

    this.handleCommentBox = this.handleCommentBox.bind(this)
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
  }

  handleCommentBox(){
    this.setState({commentBox: !this.state.commentBox})
  }

  handleDeleteButton(){
    this.setState({deleteButton: !this.state.deleteButton, deleteButtonShow: !this.state.deleteButtonShow})
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
        axios.post('/api/messages', this.state.data,
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
    const { commentBox, deleteButton, deleteButtonShow } = this.state
    const {socialPost, handleLike, handleChange, handleSubmit, data, errors, getPostInfo } = this.props
    return(
      <div>
        <div className="border-bottom border-light pb-2 mb-2">
          <h4 className="font-weight-bold">{socialPost.post_title}</h4>
          <p>Posted by <a href={`/profile/${socialPost.owner.user_profile[0].id}`}>{socialPost.owner.user_profile[0].name}</a></p>
          <p>{socialPost.post_content}</p>
          {socialPost.post_link && <p>Read more at <a href={socialPost.post_link} target="_blank" rel="noopener noreferrer">{socialPost.post_link}</a></p>}
          {socialPost.post_image && <img width="40%" src={socialPost.post_image} alt={socialPost.post_title}/>}
        </div>
        <h6 className="font-weight-bold">Industries:</h6>
        <div className="d-flex flex-wrap border-bottom border-light pb-2 mb-2">
          {socialPost.industries.map((category, id) => (
            <div key={id} className="bg-light rounded py-1 px-3 m-1 ">{category.industry}</div>
          ))}
        </div>
        <div className="d-flex flex-between pt-2 mb-3">
          <div>
            <Button
              className="buttonColor"
              name={socialPost.id}
              onClick={handleLike}
            >
              {socialPost.liked_by.length} Like(s)
            </Button>
            <Button
              className="buttonColor"
              value={socialPost.id}
              onClick={this.handleCommentBox}>
              {socialPost.comments.length} Comment(s)
            </Button>
            {!this.isOwner() && <MessageModal
              dataMessage={this.state.data}
              handleChange={this.handleChangeMessage}
              handleSubmit={this.handleSubmitMessage}
              data ={socialPost}
            />}
            {this.isOwner() && <EditSocialPost
              id={socialPost.id}
              postInfo = {getPostInfo}
            />}
            {(this.isOwner() && deleteButton) &&
              <span>
                <Button variant="danger animated fadeIn" value={socialPost.id} onClick={(e)=> {
                  this.props.handleDelete(e)
                  this.handleDeleteButton()
                }}>Confirm</Button>
                <Button className="buttonColor animated fadeIn" onClick={this.handleDeleteButton}>Cancel</Button>
              </span>
            }
            {(this.isOwner() && deleteButtonShow) &&
              <Button variant="danger animated fadeIn" onClick={this.handleDeleteButton}>Delete</Button>
            }

            {commentBox &&
              <div>
                <hr />
                {socialPost.comments.map((comment, id) => (
                  <div key={id}>
                    <span><strong>{comment.user.username}</strong> : </span>
                    <span>{comment.content}</span>
                  </div>
                ))}
                <hr />
                <Form onSubmit={(e) => {
                  handleSubmit(e, socialPost)
                }}>
                  <Form.Group controlId="content">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      name='content'
                      onChange={handleChange}
                      value={data.content || ''}
                    />
                  </Form.Group>
                  <Button className="buttonColor" type="submit">Submit</Button>
                  <Button className="buttonColor" onClick={this.handleCommentBox}>Close</Button>
                </Form>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SocialPostShow)
