import DocumentApiGenerated from "./generated/DocumentApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class DocumentApi extends DocumentApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Document List
  static getDocumentList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/documents")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default DocumentApi;