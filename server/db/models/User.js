const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    unique: true,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false

  },
  isOauthUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }

});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    //console.log("LOOK HERE", id)
    const { id } = jwt.verify(token, process.env.JWT);

    const user = await User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.byGithub = async (id) => {
  const user = await User.findOne({
    where: {
      username: id,
    },
  });

  if (!user) {
    const createdUser = await User.create({
      username: id,
      firstName: 'GV User',
      lastName: 'GitHub',
      email: 'Github',
      isOauthUser: true,
    });

    return createdUser;
  }
  return user;
};

User.getProfile = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['id', 'password'],
      },
    });

    if (!user) {
      throw error;
    }
    return user;
  } catch (ex) {
    const error = Error('Not Authorized To View');
    error.status = 401;
    throw error;
  }
};

User.putProfile = async ({
  password,
  firstName,
  lastName,
  token,
  email,
  address,
}) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id, {
      attributes: {
        exclude: [
          'password',
          'createdAt',
          'isAdmin',
          'isOauthUser',
          'updatedAt',
        ],
      },
    });
    if (!user) {
      throw error;
    }
    if (user.isOauthUser) {
      user.set({
        firstName,
        lastName,
        email,
        address,
      });
      const updated = await user.save();
      return updated;
    } else if (password) {
      user.set({
        password,
        firstName,
        lastName,
        email,
        address,
      });
      const updated = await user.save();
      return updated;
    } else {
      user.set({
        firstName,
        lastName,
        email,
        address,
      });
      const updated = await user.save();
      return updated;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
