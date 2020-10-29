import Query from "../../../infra/interface/Query";

export default class GetPortfolioDetailsQuery implements Query {

  public readonly portfolioName: string;

  public constructor (portfolioName: string){
    this.portfolioName = portfolioName;
  }
};