const NotificationsService = require('../services/notificationsService');

const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationsService.getNotifications();
    return res.status(200).json({
      method: "getNotifications",
      message: "Notifications retrieved successfully",
      notifications: notifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getNotifications",
      message: "Server Error",
    });
  }
};

module.exports = {
  getNotifications,
};
