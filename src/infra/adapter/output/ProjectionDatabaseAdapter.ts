import {v4 as uuid} from 'uuid';
import { LocalStorage } from "node-localstorage";

export default class ProjectionDatabaseAdapter {

  private readonly eventListId = uuid();
  private projectionDatabase: LocalStorage;

  public constructor(projectionDatabase: LocalStorage){
    this.projectionDatabase = projectionDatabase;
  }

  public read (): any {
    //TODO
  }

  public write (data: any): void {
    //TODO
  }

}