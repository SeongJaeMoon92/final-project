import React from 'react'
import axios from 'axios'

// import component
import Auth from '../lib/auth'

class Inbox extends React.Component{
  constructor(){
    super()

    this.state = { data: {}, errors: {}}
  }

  componentDidMount(){
    this.getMessagesInfo()
  }

  getMessagesInfo() {
    axios.get('/api/messages',
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => console.log(res.data))
  }

  render(){
    return (
      <div>
        <h1>hello inbox</h1>
      </div>
    )
  }
}

export default Inbox
