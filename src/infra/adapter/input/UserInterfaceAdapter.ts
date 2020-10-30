import GetTotalPositionTakenQuery from "../../../core/query/GetTotalPositionTakenQuery";
import GetPortfolioListQuery from "../../../core/query/GetPortfolioListQuery";
import GetPortfolioDetailsQuery from "../../../core/query/GetPortfolioDetailsQuery";
import TakesPositionInPortfolioCommand from "../../../core/domain/portfolios/command/TakesPositionInPortfolioCommand";
import CommandDispatcher from "../../dispatcher/CommandDispatcher";
import MovesPositionFromOnePortfolioToAnotherCommand from "../../../core/domain/portfolios/command/MovesPositionFromOnePortfolioToAnotherCommand";
import QueryProcesser from "../../service/QueryProcesser";
import { Commands, Queries, UserActionType } from "../../../types";

export default class UserInterfaceAdapter {

  private commandDispatcher: CommandDispatcher;
  private queryProcesser: QueryProcesser;

  public constructor(commandBus: CommandDispatcher, queryService: QueryProcesser){
    this.commandDispatcher = commandBus;
    this.queryProcesser = queryService;
  }

  public handleUserRequest = (action: UserActionType, params?: any) => {
    console.log('handling user request...');
    switch (action) {
      case Commands.TAKE_POSITION_IN_PORTFOLIO:
        this.commandDispatcher.dispatchCommand(new TakesPositionInPortfolioCommand(params.positionQuantity, params.portfolioName));
        break;
      case Commands.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER:
        this.commandDispatcher.dispatchCommand(new MovesPositionFromOnePortfolioToAnotherCommand(params.positionQuantity, params.sourcePortfolioName, params.destinationPortfolioName));
        break;
      case Queries.GET_TOTAL_POSITION_TAKEN:
        this.queryProcesser.processQuery(new GetTotalPositionTakenQuery());
        break;
      case Queries.GET_PORTFOLIO_NAME_LIST:
        this.queryProcesser.processQuery(new GetPortfolioListQuery());
        break;
      case Queries.GET_PORTFOLIO_DETAILS:
        this.queryProcesser.processQuery(new GetPortfolioDetailsQuery(params.portfolioName));
        break;
    }
  }
};
