class Flash {
  static setMessage(type, message) {
    console.log(type, message, 'setMessage')
    this.messages = this.messages || {}
    this.messages[type] = message
    console.log(this.messages, 'this messages')
  }

  static getMessages() {
    console.log(this.messages, 'is this working?')
    return this.messages
  }

  static clearMessages() {
    this.messages = null
  }
}

export default Flash
