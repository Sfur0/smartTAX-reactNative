// Import Mongoose
import mongoose from "mongoose";
// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

// Start Import Models

import DocumentModel from "../models/EasyTAX_nativeApp_db/DocumentModel";
import UserModel from "../models/EasyTAX_nativeApp_db/UserModel";

// End Import Models

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info("MongoDB connected at: " + properties.EasyTAX_nativeApp_db_dbUrl);

    // Start Init Models

		DocumentModel.init();
		UserModel.init();
 // End Init Models
  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");
    try {
      this.dbConnection_EasyTAX_nativeApp_db = await mongoose.connect(
        "mongodb://" + properties.EasyTAX_nativeApp_db_dbUrl,
        { useNewUrlParser: true }
      );
    } catch (err) {
      Logger.error(`Failed connection to the DB: ${err.message}`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_EasyTAX_nativeApp_db;
  }
}

export default new Database();
