import actionsFunction from "./generated/DocumentActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import DocumentApi from "../../api/DocumentApi";
 
 actionsFunction.loadDocumentList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return DocumentApi
     .getDocumentList()
     .then(list => {
       dispatch(actionsFunction.loadDocumentSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
