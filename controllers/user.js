const { comparedPassword, hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async postLogin(req, res, next) {
    try {
      const { name, password, inputCaptcha } = req.body;
      if (!name) {
        throw { name: "NoName" };
      }
      if (!password) {
        throw { name: "NoPassword" };
      }
      if (!inputCaptcha) {
        throw { name: "NoCaptcha" };
      }
      const user = await User.findOne({
        where: {
          username: name,
        },
      });
      if (!user) {
        throw { name: "InvalidUser" };
      }
      if (!comparedPassword(password, user.password)) {
        throw { name: "InvalidUser" };
      }
      const access_token = signToken({ id: user.id, name: user.nama });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async postRegister(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name) {
        throw { name: "NoName" };
      }
      if (!password) {
        throw { name: "NoPassword" };
      }
      const user = await User.create({ username: name, password });
      res.status(201).json({ message: `Success create user: ${name}` });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;
      if (!id) {
        throw { name: "NoUserId" };
      }
      if (!name) {
        throw { name: "NoName" };
      }
      if (!password) {
        throw { name: "NoPassword" };
      }
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFoundUser" };
      }
      await User.update(
        {
          username: name,
          password: password,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: `Success update user: ${name}` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw { name: "NoUserId" };
      }
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFoundUser" };
      }
      await User.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({ message: `Success delete user: ${user.username}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
