class Notifications {
  static setNotification(type, notification) {
    console.log(type, notification, 'one working?');
    this.notification = this.notification || {}
    this.notification[type] = notification
  }

  static getNotification() {
    console.log(this.messages, 'is this working?')
    return this.notification
  }

  static clearNotification() {
    this.notification = null
  }
}

export default Notifications
