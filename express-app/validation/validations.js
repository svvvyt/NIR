import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
  body('fullName', 'Name must be at least 3 characters long').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter the article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter the article text').isLength({ min: 3 }).isString(),
  body('imageUrl', 'Invalid image URL').optional().isString(),
];
