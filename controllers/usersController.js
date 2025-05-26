const UsersService = require('../services/usersService');
const jwt = require("jsonwebtoken");//ver si implementar
const authenticationService = require("../services/authService");
const bycrypt = require("bcrypt");

class UsersController {

  async getUsers(req, res) {
    try {
      const users = await UsersService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsers",
        message: "Server Error",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      let user = await UsersService.getUserById(id);
      return res.status(200).json({
        method: "getUserById",
        message: "User details retrieved succesfully",
        user: user
      })}catch(err){
         return res.status(404).json({
          method: "getUserById",
          message: "User not found",
        });
  }
}

   async getUsersNotifications(req, res) {
    try {
      const notifications = await UsersService.getUsersNotifications();
      return res.status(200).json(notifications);
    } catch (err) {
        return res.status(404).json({
        method: "getUsersNotifications",
        message: "User without notifications",
      });
        return res.status(500).json({
        method: "getUsersNotifications",
        message: "Server Error",
      });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await UsersService.createUser(req.body);
      return res.status(200).json({
        message: "User created succesfully",
        user: newUser,
      });
    } catch (err) {
        res.status(400).json({
        method: "createUser",
        message: "Bad Request",
      });
        res.status(500).json({
        method: "createUser",
        message: "Server Error",
      });
    }
  }

async updateUser(req,res) {
    const{
        id
    } = req.params;
    try{
      console.log(req.body.password);
      if(req.body.password){
        req.body.password = bycrypt.hashSync(req.body.password, 10);
      }
      await UsersService.updateUser(req.body,Number(id));
      const user = await UsersService.getUserById(Number(id));
      res.status(200).json({
        method: "updateUser",
        message: "User updated Succesfully",
        user: user
      }
      );
    }
    catch(err){
        res.status(400).json({
            message: "Bad Request"
        });
        res.status(404).json({
            message: "User not Found"
        });
        res.status(500).json({
            message: "Server Error"
        });
    }
}

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let isUserRegistered = await authenticationService.hasValidateCredentials(email, password);
      if (isUserRegistered) {
        const user = await UsersService.getUserByEmail(email);

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: '1d',
          user,
          PRIVATE_KEY,
        });

        return res.status(200).json({
          status: 200,
          token: token, 
          message: "Token created successfully"
        });
        
      } else {
        return res.status(401).json({
          message: "Unauthorized."
        });
      }

    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }
}

module.exports = new UsersController();