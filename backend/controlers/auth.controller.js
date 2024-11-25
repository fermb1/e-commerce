import Users from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userid) => {
  const accesToken = jwt.sign({ userid }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userid }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return { accesToken, refreshToken };
};

const storeReFreshToken = async (userid, refreshToken) => {
  await redis.set(`refreshtoken:${userid}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
};

const setCookies = (res, accesToken, refreshToken) => {
  res.cookie('accesstoken', accesToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refreshtoken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await Users.create({ name, email, password });

    const { accesToken, refreshToken } = generateTokens(user._id);
    await storeReFreshToken(user._id, refreshToken);

    setCookies(res, accesToken, refreshToken);
    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("login route called");
};

export const logout = async (req, res) => {
  res.send("logout route called");
};
