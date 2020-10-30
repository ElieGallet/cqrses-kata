import DomainEvent from "../../../infra/interface/DomainEvent";
import {v4 as uuid} from 'uuid';

export default class PositionMovedFromOnePortfolioToAnotherEvent implements DomainEvent{

  public readonly type: string = "POSITION_MOVED_FROM_ONE_PORTFOLIO_TO_ANOTHER";
  public readonly timestamp: number = Date.now();
  public readonly id: string = uuid();
  public data: object;

  public constructor (positionQuantity: number, portfolioSourceName: string, portfolioDestinationName: string){
    this.data = {
      portfolioSourceName: portfolioSourceName,
      portfolioDestinationName: portfolioDestinationName,
      positionQuantity: positionQuantity,
    };
  }
  public handle(){};
}