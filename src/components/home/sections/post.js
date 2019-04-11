import React from 'react'

class PostForm extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  handleLike() {
    
  }

  render(){
    return(
      <div className="postform">
        <div>{data.post_title}</div>
        <div>{data.post_content}</div>
        <img src={data.post_image} alt={data.post_title}/>
        <div>{data.industries}</div>
        <div>{data.owner.username}</div>
        <div>{data.liked_by.length}</div>
        <button>Liked</button>
      </div>
    )
  }
}

export default PostForm
