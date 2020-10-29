import Command from "../../../infra/interface/Command";
import DomainEvent from "../../../infra/interface/SourcedEvent";
import PositionTakenEvent from "../event/PositionTakenEvent";
import PositionCoupledWithPortfolioEvent from "../event/PositionCoupledWithPortfolioEvent";

export default class TakesPositionInPortfolioCommand implements Command{

  public readonly quantity: number;
  public readonly portfolioName: string;

  public constructor(quantity: number, portfolioName: string){}

  public handle(): DomainEvent[]{
    return [new PositionTakenEvent(this.quantity), new PositionCoupledWithPortfolioEvent(this.quantity, this.portfolioName)];
  };
};