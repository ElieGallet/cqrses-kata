import { EventEmitter } from 'events';
import { DomainEvent, DomainEvents } from "../../types";

export default class DomainEventDispatcher {

  private emitter: EventEmitter;

  public constructor (){
    this.emitter = new EventEmitter();
  }

  public dispatchEvent(event: DomainEvent): boolean {
    return this.emitter.emit(DomainEvents[event.type], event);
  }
};