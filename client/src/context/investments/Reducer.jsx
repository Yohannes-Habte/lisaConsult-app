// Action Object for the hompe page
export const INVESTMENT_ACTION = {
  // Home Page Title data
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_TITLEDATA_SUCCESS: 'FETCH_TITLEDATA_SUCCESS',
  FETCH_INVESTMENT_SUCCESS: 'FETCH_INVESTMENT_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

// Action Object for the research page
export const RESEARCH_ACTION = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_RESEARCH_SUCCESS: 'FETCH_RESEARCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

// Action Object for the Product page
export const PRODUCT_ACTION = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

// Action Object for the single Product page
export const SINGLE_PRODUCT_ACTION = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

const Reducer = (state, action) => {
  switch (action.type) {
    // Home Page Title data
    case INVESTMENT_ACTION.FETCH_REQUEST:
      return { ...state, loading: true };
    case INVESTMENT_ACTION.FETCH_TITLEDATA_SUCCESS:
      return { ...state, titleData: action.payload, loading: false };
    case INVESTMENT_ACTION.FETCH_INVESTMENT_SUCCESS:
      return { ...state, investments: action.payload, loading: false };
    // Research Page
    case RESEARCH_ACTION.FETCH_REQUEST:
      return { ...state, loading: true };
    case RESEARCH_ACTION.FETCH_RESEARCH_SUCCESS:
      return { ...state, researches: action.payload };
    case RESEARCH_ACTION.FETCH_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Product Page
    case PRODUCT_ACTION.FETCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ACTION.FETCH_PRODUCT_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case PRODUCT_ACTION.FETCH_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Single Product Page
    case SINGLE_PRODUCT_ACTION.FETCH_REQUEST:
      return { ...state, loading: true };
    case SINGLE_PRODUCT_ACTION.FETCH_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case SINGLE_PRODUCT_ACTION.FETCH_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default Reducer;
