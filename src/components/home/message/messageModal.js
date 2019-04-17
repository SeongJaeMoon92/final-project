import React from 'react'
import {Modal, Button, Form } from 'react-bootstrap'

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
    const {dataMessage, handleChange, data, handleSubmit} = this.props
    return (
      <>
        <Button className="buttonColor" onClick={this.handleShow}>
         Message {data.owner.user_profile[0].name}
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send a message to {data.owner.user_profile[0].name}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="message_content">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message_content"
                  placeholder='Message'
                  onChange={handleChange}
                  value={dataMessage.message_content || ''}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className="buttonColor" type="submit" onClick={this.handleClose}>Send</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
  }
}

export default MessageModal
