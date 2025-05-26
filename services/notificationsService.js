const { Notifications } = require("../db/database");

const getNotifications = async () => {
    return await Notifications.find();
  };

module.exports = {
  getNotifications
}