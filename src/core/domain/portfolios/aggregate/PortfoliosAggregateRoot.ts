
import DomainEventRepository from "../../../../infra/service/DomainEventRepository";
import { Portfolio } from "../../../../types";
import MovesPositionFromOnePortfolioToAnotherCommand from "../command/MovesPositionFromOnePortfolioToAnotherCommand";
import TakesPositionInPortfolioCommand from "../command/TakesPositionInPortfolioCommand";

export default class PortfoliosAggregateRoot {

  private domainEventRepository: DomainEventRepository;
  
  private unclassedPosition: number;
  private portfolioIndex: { 
    [id: string]: Portfolio;
  };

  public constructor (domainEventRepository: DomainEventRepository){
    this.domainEventRepository = domainEventRepository;
    
  }

  public movePositionFromOnePortpolioToAnother(command: MovesPositionFromOnePortfolioToAnotherCommand){
    throw new Error('to implement');
  }

  public takePositionInPortfolio(command: TakesPositionInPortfolioCommand){
    throw new Error('to implement');
  }
};