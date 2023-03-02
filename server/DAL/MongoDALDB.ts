import * as mongoDB from "mongodb";
import {ObjectId} from "mongodb";

export default class MongoDALDB {
  private client: mongoDB.MongoClient;
  private database: mongoDB.Db;
  protected collection: mongoDB.Collection;

  protected databaseName: string;
  protected collectionName: string;

  constructor(connectionString: string, database: string, collection: string) {
    this.client = new mongoDB.MongoClient(connectionString)
    this.databaseName = database;
    this.collectionName = collection;

    this.database = this.client.db();
    this.collection = this.database.collection(this.collectionName);
  }

  protected async connect() {
    await this.client.connect();
    this.initDatabase();
  }

  protected async close() {
    await this.client.close();
  }

  private initDatabase() {
    this.database = this.client.db(this.databaseName)
  }
}
