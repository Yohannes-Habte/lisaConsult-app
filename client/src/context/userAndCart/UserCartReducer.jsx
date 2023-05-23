// Object
export const USER_CART_ACTION = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  USER_REGISTER: 'USER_REGISTER',
  USER_SIGNIN: 'USER_SIGNIN',
  USER_LOG_OUT: 'USER_LOG_OUT',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  CLEAR_CART: 'CLEAR_CART',
};

const UserCartReducer = (state, action) => {
  switch (action.type) {
    // Add to cart
    case USER_CART_ACTION.ADD_ITEM_TO_CART:
      //& Step 2 adding item to cart: To add to cart and increasing the quantity of a particular item, you need three steps
      // Setp 1: Save new item (newItem) that has to be added to the cart.
      const newItem = action.payload;
      // Setp 2: Find existing item (existingItem) in the cartItems and compare with the new item (newItem).
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      /*
        Setp 3:
          - If the (existingItem) is the same as (newItem), update the (newItem) using map function.
          - If the item does not exist in the cartItems, then just  add the newItem to the cart [...state.cart.cartItems, newItem]; 
       */
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      //* Step 1: Save the cartItems in the local storage before return
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    // Remove from cart
    case USER_CART_ACTION.REMOVE_ITEM_FROM_CART: {
      // Filter the product from the cartItems
      const cartItems = state.cart.cartItems.filter(
        (product) => product._id !== action.payload._id
      );
      //* Step 1: Save the cartItems in the local storage before return
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    // After you place an order, make the cart empty
    case USER_CART_ACTION.CLEAR_CART:
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    // Login User
    case USER_CART_ACTION.USER_SIGNIN:
      return { ...state, user: action.payload };

    // Log out user
    case USER_CART_ACTION.USER_LOG_OUT:
      return {
        ...state,
        user: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };

    // Shipping Address
    case USER_CART_ACTION.SHIPPING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    // Payment Method
    case USER_CART_ACTION.PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
};

export default UserCartReducer;
