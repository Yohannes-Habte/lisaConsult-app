import { check } from 'express-validator';

const registerValidator = () => {
  return [
    check('firstName')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('First name must be between 2 and 15 characters'),

    check('lastName')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('Last name must be between 2 and 15 characters'),

    check('email').normalizeEmail().isEmail().withMessage('Email is not valid'),

    check('password')
      .isStrongPassword()
      .withMessage(
        'Password must be at least 8 characters long and contain at least one number and one uppercase letter'
      ),

    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }

      return true;
    }),
    check('phone')
      .trim()
      .escape()
      .isLength({ max: 15 })
      .withMessage('Last name must be between 2 and 15 characters'),

    check('address')
      .trim()
      .escape()
      .isLength({ min: 12 })
      .withMessage('Last name must be between 2 and 15 characters'),
    check('country')
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage('Last name must be between 2 and 15 characters'),
  ];
};

export default registerValidator;
