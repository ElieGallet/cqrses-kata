
import { Command, Commands, DomainEvent } from "../../../../types";
import PositionMovedFromOnePortfolioToAnotherEvent from "../event/PositionMovedFromOnePortfolioToAnotherEvent";

export default class MovesPositionFromOnePortfolioToAnotherCommand implements Command{

  public readonly type = Commands.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER;
  public readonly positionQuantity: number;
  public readonly portfolioSourceName: string;
  public readonly portfolioDestinationName: string;

  public constructor(positionQuantity: number, portfolioSourceName: string, portfolioDestinationName: string){
    this.positionQuantity = positionQuantity;
    this.portfolioSourceName = portfolioSourceName;
    this.portfolioDestinationName = portfolioDestinationName;
  }
};