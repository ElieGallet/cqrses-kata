import Command from "../../../infra/interface/Command";
import DomainEvent from "../../../infra/interface/DomainEvent";
import PositionMovedFromOnePortfolioToAnotherEvent from "../event/PositionMovedFromOnePortfolioToAnotherEvent";

export default class MovesPositionFromOnePortfolioToAnotherCommand implements Command{

  private positionQuantity: number;
  private portfolioSourceName: string;
  private portfolioDestinationName: string;

  public constructor(positionQuantity: number, portfolioSourceName: string, portfolioDestinationName: string){
    this.positionQuantity = positionQuantity;
    this.portfolioSourceName = portfolioSourceName;
    this.portfolioDestinationName = portfolioDestinationName;
  }

   public handle(): DomainEvent[]{
    return [
      new PositionMovedFromOnePortfolioToAnotherEvent(this.positionQuantity, this.portfolioSourceName, this.portfolioDestinationName),
    ];
  };
};