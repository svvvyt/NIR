import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, reply) => {
  try {
    const { password, email, fullName, avatarUrl } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      { _id: user._id },
      'secret123', // TODO: Use environment variables for secret
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    reply.send({
      ...userData,
      token,
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: 'Failed to register user',
    });
  }
};

export const login = async (req, reply) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return reply.status(404).send({
        message: 'User is not registered',
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return reply.status(400).send({
        message: 'Wrong login or password',
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      'secret123', // TODO: Use environment variables for secret
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    reply.send({
      ...userData,
      token,
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: `Failed to authorize, error: ${error}`,
    });
  }
};

export const getMe = async (req, reply) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return reply.status(404).send({
        message: 'User not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    reply.send(userData);
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: `Failed to display user info, error: ${error}`,
    });
  }
};
