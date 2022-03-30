// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  document: {}
};

// Reducer
export default function DocumentEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case types.UPDATE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case types.GET_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
     // END REDUCERS
    
    case types.RESET_DOCUMENT:
      state = initialState;
      return state;
    default:
      return state;
  }
}