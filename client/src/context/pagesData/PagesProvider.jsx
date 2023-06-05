import { createContext, useReducer } from 'react';
import ProductReducer from './Reducer';

// Initial Sate Variables
const initialState = {
  titleData: {},
  investments: [],
  procedures: {},
  courses: [],
  products: [], 
  product: [], 
  researches: [],
  footer: {},
  loading: false,
  error: ""
};

export const PagesContext = createContext(initialState);

const PagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  return (
    <PagesContext.Provider
      value={{
        titleData: state.titleData,
        investments: state.investments,
        procedures: state.procedures,
        courses: state.courses,
        products: state.products,
        product: state.product,
        researches: state.researches,
        footer: state.footer,
        error: state.error,
        loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export default PagesProvider;
