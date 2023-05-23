# lisaConsult-app

## Passord generator

- https://randomkeygen.com/

## Add to Cart

There are three critical steps to add item to a shopping cart:

1. Add to cart function in the singlePage
2. Add to cart in the reducer function (UserCartReducer) funtion
3. Badge cart in the Navbar component

## How to use react toastify

1. import ToastContainer and Toast CSS in the App.js
2. In the App.js under the Router, state the position and limit of the error using the ToastContainer such as <ToastContainer position="bottom-center" limit={1} />
3. In the place that you want to display the error, use toast that comes from import { toast } from 'react-toastify';
