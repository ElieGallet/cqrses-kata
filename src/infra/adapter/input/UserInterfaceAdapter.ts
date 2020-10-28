import TakesPositionCommand from "../../../core/domain/command/TakesPositionCommand";
import CompletesPortfolioCommand from "../../../core/domain/command/CompletesPortfolioCommand";
import CommandBus from "../../bus/CommandBus";
import Queryhandler from "../../handler/QueryHandler";
import UserAction from "../../enum/UserAction";

export default class UserInterfaceAdapter {

  private commandBus: CommandBus;
  private queryHandler

  public constructor(commandBus: CommandBus, queryHandler: Queryhandler){
    this.commandBus = commandBus;
    this.queryHandler = queryHandler;
  }

  public handleRequest = (action: UserAction, params?: any) => {

    try{
      switch (action) {
        case UserAction.TAKE_POSITION:
          this.commandBus.addCommand(new TakesPositionCommand(params.volume));
          break;
        case UserAction.COMPLETE_PORTFOLIO:
          this.commandBus.addCommand(new CompletesPortfolioCommand(params.volume, params.portfolioId));
          break;
        case UserAction.MOVE_POSITION_TO_PORTFOLIO:
          this.commandBus.addCommand(new TakesPositionCommand(params.volume));
          break;
        case UserAction.GET_POSITION_LIST:
          this.commandBus.addCommand(new TakesPositionCommand(params.volume));
          break;
        case UserAction.GET_PORTFOLIO_LIST:
          this.commandBus.addCommand(new TakesPositionCommand(params.volume));
          break;
        case UserAction.GET_PORTFOLIO_DETAILS:
          this.commandBus.addCommand(new TakesPositionCommand(params.volume));
          break;
      }
    } catch {
      console.log('error handling input');
      process.exit(1);
    }
  }
};
