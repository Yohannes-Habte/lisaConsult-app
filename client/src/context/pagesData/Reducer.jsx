// Action Object for the hompe page
export const TITLEDATA_ACTION = {
  // Home Page Title data
  FETCH_TITLEDATA_REQUEST: 'FETCHTITLEDATA_REQUEST',
  FETCH_TITLEDATA_SUCCESS: 'FETCH_TITLEDATA_SUCCESS',
  FETCH_TITLEDATA_FAIL: 'FETCHTITLEDATA_FAIL',
};

// Action Object for the hompe page
export const INVESTMENT_ACTION = {
  // Home Page Title data
  FETCH_INVESTMENT_REQUEST: 'FETCH_INVESTMENT_REQUEST',
  FETCH_INVESTMENT_SUCCESS: 'FETCH_INVESTMENT_SUCCESS',
  FETCH_INVESTMENT_FAIL: 'FETCH_INVESTMENT_FAIL',
};

// Action Object for the Procudere page
export const PROCEDURE_ACTION = {
  // Home Page Title data
  FETCH_PROCEURE_REQUEST: 'FETCH_PROCEURE_REQUEST',
  FETCH_PROCEURE_SUCCESS: 'FETCH_PROCEURE_SUCCESS',
  FETCH_PROCEURE_FAIL: 'FETCH_PROCEURE_FAIL',
};

// Action Object for the Course page
export const COURSE_ACTION = {
  // Home Page Title data
  FETCH_COURSE_REQUEST: 'FETCH_COURSE_REQUEST',
  FETCH_COURSE_SUCCESS: 'FETCH_COURSE_SUCCESS',
  FETCH_COURSE_FAIL: 'FETCH_COURSE_FAIL',
};

// Action Object for the Product page
export const PRODUCTS_ACTION = {
  FETCH_PRODUCTS_REQUEST: 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAIL: 'FETCH_PRODUCTS_FAIL',
};

// Action Object for the single Product page
export const PRODUCT_ACTION = {
  FETCH_PRODUCT_REQUEST: 'FETCH_PRODUCT_REQUEST',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAIL: 'FETCH_PRODUCT_FAIL',
};

// Action Object for the research page
export const RESEARCH_ACTION = {
  FETCH_RESEARCH_REQUEST: 'FETCH_RESEARCH_REQUEST',
  FETCH_RESEARCH_SUCCESS: 'FETCH_RESEARCH_SUCCESS',
  FETCH_RESEARCH_FAIL: 'FETCH_RESEARCH_FAIL',
};

// Action Object for the research page
export const FOOTER_ACTION = {
  FETCH_FOOTER_REQUEST: 'FETCH_FOOTER_REQUEST',
  FETCH_FOOTER_SUCCESS: 'FETCH_FOOTER_SUCCESS',
  FETCH_FOOTER_FAIL: 'FETCH_FOOTER_FAIL',
};

const Reducer = (state, action) => {
  switch (action.type) {
    // Home Page Title data
    case TITLEDATA_ACTION.FETCH_TITLEDATA_REQUEST:
      return { ...state, loading: true };
    case TITLEDATA_ACTION.FETCH_TITLEDATA_SUCCESS:
      return { ...state, titleData: action.payload, loading: false };
    case TITLEDATA_ACTION.FETCH_TITLEDATA_FAIL:
      return { ...state, error: action.payload };

    // Home Page Investment
    case INVESTMENT_ACTION.FETCH_INVESTMENT_REQUEST:
      return { ...state, loading: true };
    case INVESTMENT_ACTION.FETCH_INVESTMENT_SUCCESS:
      return { ...state, investments: action.payload, loading: false };
    case INVESTMENT_ACTION.FETCH_INVESTMENT_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Procedure Page Investment
    case PROCEDURE_ACTION.FETCH_PROCEURE_REQUEST:
      return { ...state, loading: true };
    case PROCEDURE_ACTION.FETCH_PROCEURE_SUCCESS:
      return { ...state, procedures: action.payload, loading: false };
    case PROCEDURE_ACTION.FETCH_PROCEURE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Courses Page Investment
    case COURSE_ACTION.FETCH_COURSE_REQUEST:
      return { ...state, loading: true };
    case COURSE_ACTION.FETCH_COURSE_SUCCESS:
      return { ...state, courses: action.payload, loading: false };
    case COURSE_ACTION.FETCH_COURSE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Products Page
    case PRODUCTS_ACTION.FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case PRODUCTS_ACTION.FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case PRODUCTS_ACTION.FETCH_PRODUCTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Single Product Page
    case PRODUCT_ACTION.FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ACTION.FETCH_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case PRODUCT_ACTION.FETCH_PRODUCT_FAIL:
      return { ...state, error: action.payload };

    // Research Page
    case RESEARCH_ACTION.FETCH_RESEARCH_REQUEST:
      return { ...state, loading: true };
    case RESEARCH_ACTION.FETCH_RESEARCH_SUCCESS:
      return { ...state, researches: action.payload };
    case RESEARCH_ACTION.FETCH_RESEARCH_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Research Page
    case FOOTER_ACTION.FETCH_FOOTER_REQUEST:
      return { ...state, loading: true };
    case FOOTER_ACTION.FETCH_FOOTER_SUCCESS:
      return { ...state, footer: action.payload };
    case FOOTER_ACTION.FETCH_FOOTER_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default Reducer;
