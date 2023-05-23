import { createContext, useReducer } from 'react';
import ProductReducer from './Reducer';

// Initial Sate Variables
const initialState = {
  loading: false,
  titleData: {},
  investments: [],
  products: [], // All products for the product page
  product: [], // Single product for the single product page
  researches: [],
  error: '',
};

export const ServiceContext = createContext(initialState);

const ServiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  return (
    <ServiceContext.Provider
      value={{
        investments: state.investments,
        titleData: state.titleData,
        products: state.products,
        product: state.product,
        researches: state.researches,
        error: state.error,
        loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
