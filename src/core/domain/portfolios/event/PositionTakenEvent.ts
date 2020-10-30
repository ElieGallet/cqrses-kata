import {v4 as uuid} from 'uuid';
import { DomainEvent, DomainEvents } from "../../../../types";

export default class PositionTakenEvent implements DomainEvent{

  public readonly type = DomainEvents.POSITION_TAKEN;
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