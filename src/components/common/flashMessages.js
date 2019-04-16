import React from 'react'
import Flash from '../lib/flash'
import { Alert } from 'react-bootstrap'

class FlashMessages extends React.Component {
  constructor() {
    super()

    this.state = { messages: null }
  }

  componentDidUpdate() {
    const messages = Flash.getMessages()
    console.log(messages, 'update')
    if (!messages) return false

    this.setState({ messages })
    console.log(this.state.messages, 'update message')
    Flash.clearMessages()
    setTimeout(() => this.setState({ messages: null }), 4000)
  }

  render() {
    // console.log(this.state.messages, 'message')
    return (
      <div>
        {this.state.messages &&
          Object.keys(this.state.messages).map((type, idx) => (
            <Alert key={idx} variant={type}>
              {this.state.messages[type]}
            </Alert>
          ))
        }
      </div>
    )
  }
}

export default FlashMessages
