import DomainEvent from "../../../infra/interface/DomainEvent";
import {v4 as uuid} from 'uuid';

export default class PositionCreatedEvent implements DomainEvent{

  public readonly type: string = "POSITION_TAKEN";
  public readonly timestamp: number = Date.now();
  public readonly id: string = uuid();
  public data: object;

  public constructor (positionQuantity: number){
    this.data = {
      positionQuantity: positionQuantity,
    };
  }
  public handle(){};
}