import React from 'react'
import {Modal, Button, ButtonToolbar} from 'react-bootstrap'

class MessageModal extends React.Component {
  constructor() {
    super()

    this.state = { show: false}

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  render() {
    const {dataMessage, handleChange, socialPostData, handleSubmit} = this.props
    console.log(socialPostData)
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
         Message to {socialPostData.owner.username}
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>To {socialPostData.owner.username}</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <label htmlFor="message_content">Message</label>
              <textarea
                name="message_content"
                id="message_content"
                placeholder='Message Content'
                onChange={handleChange}
                value={dataMessage.message_content || ''}
              />
            </Modal.Body>
            <Modal.Footer>
              <button onClick={this.handleClose}>send</button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    )
  }
}

export default MessageModal
