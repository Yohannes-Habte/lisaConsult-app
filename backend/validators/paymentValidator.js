import { check } from 'express-validator';

const paymentValidator = () => {
  return [
    check('paymentMethodName')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('First name must be between 2 and 15 characters'),
  ];
};

export default paymentValidator;
