const initialState = {
  fetching: false,
  name: null,
  email: null,
  password:null,
  shippingAddress:null,
  availabilityStatus: false,
  role:null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER_REQUEST': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'REGISTER_USER_SUCCESS': {
      return {
        ...state,
        fetching: false,
        ...action.payload
      };
    }
    case 'REGISTER_USER_FAILED': {
      return {
        ...state,
        fetching: false
      };
    }
    case 'LOGIN_USER_REQUEST': {
      console.log("this is login user request");
      return {
        
        ...state,
        fetching: true
      };
    }
    case 'LOGIN_USER_SUCCESS': {
      return {
        ...state,
        fetching: false,
        ...action.payload
      };
    }
    case 'GET_USER_REQUEST': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'GET_USER_SUCCESS': {
      return {
        ...initialState,
        fetching: false,
        ...action.payload
      };
    }
    case 'GET_USER_FAILED': {
      return {
        ...state,
        fetching: false
      };
    }
    case 'LOGOUT_USER_SUCCESS': {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
