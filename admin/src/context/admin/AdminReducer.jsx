import { ADMIN_ACTION } from './AdminProvider';

const AdminReducer = (state, action) => {
    switch (action.type) {
      case ADMIN_ACTION.LOGIN_START:
        return { user: null, loading: true, error: null };
  
      case ADMIN_ACTION.LOGIN_SUCCESS:
        return { user: action.payload, loading: false, error: null };
  
      case ADMIN_ACTION.LOGIN_FAILED:
        return { user: null, loading: false, error: action.payload };
  
      case ADMIN_ACTION.ADMIN_LOG_OUT:
        return { user: null, loading: false, error: null };
  
      default:
        return state;
    }
  };

export default AdminReducer