import ProjectionDatabaseAdapter from "../adapter/output/ProjectionDatabaseAdapter";
import { DomainEvent, DomainEvents } from "../../types";
import PositionCoupledWithPortfolioEvent from "../../core/domain/portfolios/event/PositionCoupledWithPortfolioEvent";
import PositionTakenEvent from "../../core/domain/portfolios/event/PositionTakenEvent";

export default class Denormalizer {

  private projectionDatabaseAdapter: ProjectionDatabaseAdapter;


  public constructor (projectionDatabaseAdapter: ProjectionDatabaseAdapter){
    this.projectionDatabaseAdapter = projectionDatabaseAdapter;
  }

  public positionTaken(event: PositionTakenEvent){

  }
  public positionCoupledWithPortfolio(event: PositionCoupledWithPortfolioEvent){
    
  }
  public positionMovedFromOnePortfolioToAnother(){
    
  }
}