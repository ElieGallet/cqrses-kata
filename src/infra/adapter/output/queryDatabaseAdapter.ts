import {v4 as uuid} from 'uuid';
import { LocalStorage } from "node-localstorage";

export default class QueryDatabaseAdapter {

  private readonly eventListId = uuid();
  private queryDatabase: LocalStorage;

  public constructor(queryDatabase: LocalStorage){
    this.queryDatabase = queryDatabase;
  }

  public read (): any {
    //TODO
  }

  public write (data: any): void {
    //TODO
  }

}