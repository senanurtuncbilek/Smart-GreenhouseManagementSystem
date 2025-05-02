import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from 'dotenv';
config();

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });
    res.status(201).json({ message: 'User created!', user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Email not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
      { expiresIn: '7d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};




const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token missing' });
    return;
  }

  try {
    const payload: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    const user = await User.findByPk(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      res.status(403).json({ error: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};


const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ error: 'Refresh token missing' });
    return;
  }

  try {
    const payload: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const user = await User.findByPk(payload.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};


console.log('authController çalışıyor: ', typeof register, typeof login);

export default { register, login, refreshAccessToken, logout };
