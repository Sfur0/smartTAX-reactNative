// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function DocumentListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case types.LIST_DOCUMENT_SUCCESS:
      return { ...state, listDocument: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}