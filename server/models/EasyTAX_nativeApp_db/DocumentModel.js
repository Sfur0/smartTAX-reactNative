import DocumentModelGenerated from "./generated/DocumentModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
    
    init() {
      let schema = DocumentModelGenerated.init();
  
      schema.add({
        extraCustomField: Object
      });
    },
     
   */


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await DocumentModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...DocumentModelGenerated,
  ...customModel
};
