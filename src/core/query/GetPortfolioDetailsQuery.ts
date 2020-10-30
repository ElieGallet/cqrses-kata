import { Queries, Query } from "../../types";

export default class GetPortfolioDetailsQuery implements Query {

  public readonly portfolioName: string;
  public readonly type = Queries.GET_PORTFOLIO_DETAILS;

  public constructor (portfolioName: string){
    this.portfolioName = portfolioName;
  }

  public resolve (){}
};