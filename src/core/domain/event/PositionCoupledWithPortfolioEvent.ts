import SourcedEvent from "../../../infra/interface/SourcedEvent";
import {v4 as uuid} from 'uuid';

export default class PositionAddedToPortfolioEvent implements SourcedEvent{

  public readonly type: string = "POSITION_COUPLED_WITH_PORTFOLIO";
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