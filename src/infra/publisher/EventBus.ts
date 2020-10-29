import DomainEvent from '../interface/DomainEvent';

export default class EventBus {
  private events: DomainEvent[];

  public constructor(){
    this.events = [];
  }

  public addEvent(event: DomainEvent): void{
    this.events.push(event);
  }
  public process(): void{
    //TODO
  }
};