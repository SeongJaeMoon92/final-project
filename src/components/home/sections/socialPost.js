import axios from 'axios'
import React from 'react'

import Auth from '../../lib/auth'
import SocialPostForm from './socialPostForm'

class SocialPost extends React.Component {
  constructor() {
    super()

    this.state = { data:{}, errors:{}, dataM: {} }

    this.handleLike = this.handleLike.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
  }

  componentDidMount() {
    this.getPostInfo()
  }

  getPostInfo(){
    axios.get('/api/social_posts')
      .then(res => this.setState({socialPosts: res.data}))
  }

  handleLike(e) {
    e.preventDefault()
    axios.put(`/api/social_posts/${e.target.name}/like`, {},
    { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPostInfo())
      .catch(err => console.log(err.response))
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }
  handleChangeMessage({target: {name, value}}){
    const dataM = {...this.state.dataM, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ dataM, errors })
  }

  handleSubmit(e, socialPost){
    e.preventDefault()
    axios.post(`/api/social_posts/${socialPost.id}/comments`,  this.state.data,
    { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.setState({data: ''}, this.getPostInfo()))
      .catch(err => this.setState({errors: err.response.data}))
  }

  handleSubmitMessage(e, socialPost){
    console.log(socialPost)
    e.preventDefault()
    const dataM = {...this.state.dataM, receiver_id: socialPost.owner.id}
    this.setState({dataM},
      () =>  {
        console.log(this.state.dataM)
        axios.post(`/api/messages`, this.state.dataM,
        { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
          .then(() => this.setState({dataM: ''}))
          .catch(err => this.setState({errors: err.response.data}))
      }
    )
  }

  render(){
    const {socialPosts} = this.state
    console.log(this.state.dataM)
    return(
      <div className="postform">
        {socialPosts && socialPosts.sort((a,b) => {
          if (a.id > b.id) return 1
          return -1
        }).map((socialPost,id) => (
          <div key={id}>
            <SocialPostForm
              socialPost = {socialPost}
              handleLike = {this.handleLike}
              handleChange = {this.handleChange}
              handleSubmit = {this.handleSubmit}
              handleChangeMessage = {this.handleChangeMessage}
              handleSubmitMessage = {this.handleSubmitMessage}
              data = {this.state.data}
              dataM = {this.state.dataM}
              errors = {this.state.errors}
            />
          </div>
        ))}
      </div>
    )
  }
}







export default SocialPost
