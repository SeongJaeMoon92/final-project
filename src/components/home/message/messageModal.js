import React from 'react'
import {Modal, Button, ButtonToolbar, Form } from 'react-bootstrap'

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
        <Button variant="primary" onClick={this.handleShow}>
         Message to {data.owner.username}
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>To {data.owner.username}</Modal.Title>
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
              <Button onClick={this.handleClose}>Send</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
  }
}

export default MessageModal
