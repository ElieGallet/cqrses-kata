import {v4 as uuid} from 'uuid';
import { DomainEvent, DomainEvents } from '../../../../types';

export default class PositionCoupledWithPortfolioEvent implements DomainEvent{

  public readonly type = DomainEvents.POSITION_COUPLED_WITH_PORTFOLIO;
  public readonly timestamp: number = Date.now();
  public readonly id: string = uuid();
  public data: object;

  public constructor (positionQuantity: number, portfolioName: string){
    this.data = {
      portfolioName: portfolioName,
      positionQuantity: positionQuantity,
    };
  }
  public handle(){};
}