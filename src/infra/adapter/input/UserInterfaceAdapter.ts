import TakesPositionInPortfolioCommand from "../../../core/domain/command/TakesPositionInPortfolioCommand";
import MovesPositionFromOnePortfolioToAnother from "../../../core/domain/command/MovesPositionFromOnePortfolioToAnotherCommand";
import GetTotalPositionTakenQuery from "../../../core/domain/query/GetTotalPositionTakenQuery";
import GetPortfolioListQuery from "../../../core/domain/query/GetPortfolioListQuery";
import GetPortfolioDetailsQuery from "../../../core/domain/query/GetPortfolioDetailsQuery";

import CommandPublisher from "../../bus/CommandBus";
import QueryService from "../../../core/service/QueryService";
import UserAction from "../../enum/UserAction";

export default class UserInterfaceAdapter {

  private commandBus: CommandPublisher;
  private queryService: QueryService;

  public constructor(commandBus: CommandPublisher, queryService: QueryService){
    this.commandBus = commandBus;
    this.queryService = queryService;
  }

  public handleUserRequest = (action: UserAction, params?: any) => {
    console.log('handling user request...');
    switch (action) {
      case UserAction.TAKE_POSITION_IN_PORTFOLIO:
        this.commandBus.addCommand(new TakesPositionInPortfolioCommand(params.positionQuantity, params.portfolioName));
        break;
      case UserAction.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER:
        this.commandBus.addCommand(new MovesPositionFromOnePortfolioToAnother(params.positionQuantity, params.sourcePortfolioName, params.destinationPortfolioName));
        break;
      case UserAction.GET_TOTAL_POSITION_TAKEN:
        this.queryService.processQuery(new GetTotalPositionTakenQuery());
        break;
      case UserAction.GET_PORTFOLIO_LIST:
        this.queryService.processQuery(new GetPortfolioListQuery());
        break;
      case UserAction.GET_PORTFOLIO_DETAILS:
        this.queryService.processQuery(new GetPortfolioDetailsQuery(params.portfolioName));
        break;
    }
  }
};
