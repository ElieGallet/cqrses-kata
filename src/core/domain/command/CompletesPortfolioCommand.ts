import Command from "../../../infra/interface/Command";

export default class CompletesPortfolioCommand implements Command{

  public quantity: number;
  public portfolioId: string;
  
  public constructor(quantity: number, portfolioId: string){
    this.quantity = quantity;
    this.portfolioId = portfolioId;
  }

  public handle(){};
};