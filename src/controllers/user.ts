import { Request, Response } from 'express';
import User from '../schemas/user';
import { comparePassword, generateJWT, hashPassword, sendResponse } from '../utils';

const create_user = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const hashpassword = await hashPassword(password);

    const user = new User({ ...req.body, password: hashpassword });

    await user.save();

    const data = {
      name: user.name,
      email: user.email,
    };

    res.status(201).send(sendResponse({ success: true, data }));
  } catch (err) {
    res.status(400).send(sendResponse({ success: false, message: String(err) }));
  }
};

const sign_in = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send(sendResponse({ success: false, message: 'Senha ou e-mail incorreto.' })); 

    const isCorrectPassword = await comparePassword(password, user.password);

    if (!isCorrectPassword) return res.status(400).send(sendResponse({ success: false, message: 'Senha ou e-mail incorreto.' }));

    const token = generateJWT({ email: user.email });

    const data = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token
    };

    res.status(201).send(sendResponse({ success: true, data }));
  } catch (err) {
    res.status(400).send(sendResponse({ success: false, message: String(err) }));
  }
};

export default {
  create_user,
  sign_in,
}