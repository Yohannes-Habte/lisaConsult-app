import { check } from 'express-validator';

const courseName = () => {
  return [
    check('name')
      .trim()
      .escape()
      .isLength({ max: 25 })
      .withMessage('City should not be more than 25 characters'),

    check('start')
      .trim()
      .escape()
      .isLength({ max: 25 })
      .withMessage('State should not be more than 25 characters'),
  ];
};

export default courseName;
