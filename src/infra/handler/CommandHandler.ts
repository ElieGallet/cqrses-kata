import { EventEmitter } from "events";
import PortfoliosAggregateRoot from "../../core/domain/portfolios/aggregate/PortfoliosAggregateRoot";
import MovesPositionFromOnePortfolioToAnotherCommand from "../../core/domain/portfolios/command/MovesPositionFromOnePortfolioToAnotherCommand";
import { Command, Commands } from "../../types";

export default class CommandHandler {

  private emitter: EventEmitter;
  private portfoliosAggregateRoot: PortfoliosAggregateRoot;


  public constructor(portfoliosAggregateRoot: PortfoliosAggregateRoot) {
    this.emitter = new EventEmitter();
    this.portfoliosAggregateRoot = portfoliosAggregateRoot;
  }

  public startListening(): void{
    this.emitter.on(
      Commands[Commands.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER], 
      (command: MovesPositionFromOnePortfolioToAnotherCommand) => {
        this.portfoliosAggregateRoot.movePositionFromOnePortpolioToAnother(command);
      }
    );
    this.emitter.on(
      Commands[Commands.TAKE_POSITION_IN_PORTFOLIO], 
      (command) => {
        this.portfoliosAggregateRoot.takePositionInPortfolio(command);
      }
    );
  }

  public stopListening(): void{

  }
}