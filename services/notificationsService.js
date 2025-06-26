const Notification = require("../db/models/Notification");

const getNotifications = async () => {
    return await Notification.find();
  };

module.exports = {
  getNotifications
}