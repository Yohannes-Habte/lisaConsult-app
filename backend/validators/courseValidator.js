import { check } from 'express-validator';

const courseValidator = () => {
  return [
    check('name')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('First name must be between 2 and 15 characters'),

    check('price')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('Last name must be between 2 and 15 characters'),
    check('language')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('First name must be between 2 and 15 characters'),

    check('description')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('Last name must be between 2 and 15 characters'),
  ];
};

export default courseValidator;
