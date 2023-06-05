import { check } from 'express-validator';

const shippingValidator = () => {
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
    check('phone')
      .trim()
      .escape()
      .isLength({ max: 15 })
      .withMessage('Phone number should not be more than 15 characters'),
    check('address')
      .trim()
      .escape()
      .isLength({ max: 50 })
      .withMessage('Residence address should not be more than 50 characters'),
    check('zipCode')
      .trim()
      .escape()
      .isLength({ max: 5 })
      .withMessage('Zipcode should not be more than 5 characters'),
    check('city')
      .trim()
      .escape()
      .isLength({ max: 25 })
      .withMessage('City should not be more than 25 characters'),
    check('state')
      .trim()
      .escape()
      .isLength({ max: 25 })
      .withMessage('State should not be more than 25 characters'),
    check('country')
      .trim()
      .escape()
      .isLength({ max: 25 })
      .withMessage('Country should not be more than 25 characters'),
  ];
};

export default shippingValidator;
