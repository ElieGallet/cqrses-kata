import { EventEmitter } from "events";
import Denormalizer from "../service/Denormalizer";
import { Commands, DomainEvents } from "../../types";
import PositionTakenEvent from "../../core/domain/portfolios/event/PositionTakenEvent";

export default class DomainEventHandler {

  private emitter: EventEmitter;
  private denormalizer: Denormalizer;


  public constructor(denormalizer: Denormalizer) {
    this.emitter = new EventEmitter();
    this.denormalizer = denormalizer;
  }

  public startListening(): void{
    this.emitter.on(
      DomainEvents[DomainEvents.POSITION_TAKEN], 
      (domainEvent: PositionTakenEvent) => {
        this.denormalizer.positionTaken(domainEvent);
      }
    );
    this.emitter.on(
      DomainEvents[DomainEvents.POSITION_COUPLED_WITH_PORTFOLIO], 
      (domainEvent: PositionTakenEvent) => {
        this.denormalizer.positionCoupledWithPortfolio(domainEvent);
      }
    );
  }

  public stopListening(): void{

  }
}