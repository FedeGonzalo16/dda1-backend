const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);