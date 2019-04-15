import React from 'react'
import axios from 'axios'
import {Form, Button, Container, Row, Col, Badge} from 'react-bootstrap'

// import component
import Auth from '../lib/auth'

class Inbox extends React.Component{
  constructor(){
    super()

    this.state = { data: {}, errors: {}, dataMessage: {}}

    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickColor = this.handleClickColor.bind(this)
  }

  componentDidMount(){
    this.getMessagesInfo()
  }

  getMessagesInfo() {
    axios.get('/api/messages',
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({data: res.data}))
      .then(() => {
        const receiver =  this.state.data.sent_messages.map(message =>(
          message.receiver.id
        ))
        this.setState({receiver})
      })
      .then(() => {
        const arr = []
        const newArr = arr.concat(this.state.receiver)
        const newSet = [...new Set(newArr)]
        return newSet
      })
      .then(res => {
        return res.map(id => {
          return axios.get(`/api/users/${id}/profile`,
            { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
            .then(res => res.data)
        })
      })
      .then(res => Promise.all(res))
      .then(res => this.setState({profiles: res}))
  }

  handleClick(e, profile){
    this.setState({id: profile.owner.id}, ()=> this.sortMessages())
  }

  sortMessages(){
    const {received_messages, sent_messages}= this.state.data
    const filteredReceivedMessages = received_messages.filter(message => message.sender.id === this.state.id)
    const filteredsentMessages = sent_messages.filter(message => message.receiver.id === this.state.id)
    const messages = filteredReceivedMessages.concat(filteredsentMessages)
    const sortMessages = messages.sort((a,b) => {
      if(a.id > b.id) return 1
      return -1
    })
    this.setState({sortMessages})
  }

  handleMessageUpdate(){
    this.getMessagesInfo()
    setTimeout(() => {
      this.sortMessages()
    }, 300)
  }

  handleChangeMessage({target: {name, value}}){
    const dataMessage = {...this.state.dataMessage, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ dataMessage, errors })
  }

  handleSubmitMessage(e){
    e.preventDefault()
    const dataMessage = {...this.state.dataMessage, receiver_id: this.state.id}
    this.setState({dataMessage},
      () =>  {
        axios.post('/api/messages', this.state.dataMessage,
          { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
          .then((res) => this.setState({dataMessage: ''},() => {
            console.log(res.data)
            this.handleMessageUpdate()
          }))
          .catch(err => this.setState({errors: err.response.data}))
      }
    )
  }

  handleClickColor(e){
    const divArray = [...this.DivButton.children]
    if(divArray.some(x => x.classList.contains('active'))){
      const newarray = divArray.filter(x => x.classList.contains('active'))
      newarray[0].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
  }

  render(){
    const {data, profiles, sortMessages, dataMessage} = this.state
    console.log(sortMessages)
    return (
      <Container className="container-fluid my-3 h-100 inboxContainer">
        <div className="messageSidebar">
          <div className="sideBar">
            <Badge variant="secondary" className="text">Messaging</Badge>
            <div ref={el => this.DivButton = el} className="scrollSideBar">
            {profiles && profiles.map((profile, id) => (
                <div className="listItem" key={id} onClick={(e) => {
                  this.handleClick(e, profile)
                  this.handleClickColor(e)
                } }>
                  <div>{profile.image}</div>
                  <div>{profile.name}</div>
                  <div>{profile.location}</div>
                  <hr/>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="messageBox">
          <div className="border-bottom message">
            {sortMessages && sortMessages.map((message, id) => (
              <Row className="my-4" key={id}>
                <Col className={message.sender.id === Auth.getPayload().sub ? 'mx-4 text-right' : 'mx-4 text-left'}>
                  <div>{message.message_content}</div>
                  <div>Sent by: {message.sender.username}</div>
                  <hr />
                </Col>
              </Row>
            ))}
          </div>
          <div className="messageContent">
            <Form onSubmit={this.handleSubmitMessage}>
              <Form.Group controlId="message_content">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message_content"
                  placeholder='Message'
                  onChange={this.handleChangeMessage}
                  value={dataMessage.message_content || ''}
                />
              </Form.Group>
              <Button type="submit">Send</Button>
            </Form>
          </div>
        </div>
      </Container>
    )
  }
}

export default Inbox
