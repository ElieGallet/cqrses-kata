import { EventEmitter } from "events";
import PortfoliosAggregateRoot from "../../core/domain/aggregate/PortfoliosAggregateRoot";
import { Command, Commands } from "../types";

export default class CommandHandler {

  private emitter: EventEmitter;
  private portfoliosAggregateRoot: PortfoliosAggregateRoot;


  public constructor(portfoliosAggregateRoot: PortfoliosAggregateRoot) {
    this.emitter = new EventEmitter();
    this.portfoliosAggregateRoot = PortfoliosAggregateRoot;
  }

  public startListening(): void{
    this.emitter.on(Commands[Commands.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER], (command) => {

    })
  }

  public stopListening(): void{

  }
}