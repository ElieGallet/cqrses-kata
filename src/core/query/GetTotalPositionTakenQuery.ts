import { Queries, Query } from "../../types";

export default class GetPortfolioListQuery implements Query {

  public readonly type = Queries.GET_PORTFOLIO_NAME_LIST;
  
  public resolve (){}
};