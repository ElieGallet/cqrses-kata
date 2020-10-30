import { Command, Commands } from "../../../../types";

export default class TakesPositionInPortfolioCommand implements Command{

  public readonly type = Commands.TAKE_POSITION_IN_PORTFOLIO;
  public readonly positionQuantity: number;
  public readonly portfolioName: string;

  public constructor(positionQuantity: number, portfolioName: string){
    this.positionQuantity = positionQuantity;
    this.portfolioName = portfolioName;
  }
};