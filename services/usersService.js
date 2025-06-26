//Con Mongo
const User = require("../db/models/User"); // Ver que User sea un modelo Mongoose válido

const getUsers = async () => {
    return await User.find();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUsersNotifications = async (id) => {
    const user = await User.findById(id);
    return user.notifications || []; // Retorna un array vacío si no hay notificaciones
};

const updateUser = async (user, id) => {
    return await User.findByIdAndUpdate(id, user, { new: true }); 
};

const login = async (email, password) => {
    return await User.findOne({
        email: email,
        password: password, //encriptar y comparar contraseñas
  });
};

const createUser = async (user) => {
    return await User.create(user); // Mongoose maneja automáticamente la inserción
};


module.exports = {
  getUsers,
  getUserById,
  getUsersNotifications,
  login,
  createUser,
  updateUser
};