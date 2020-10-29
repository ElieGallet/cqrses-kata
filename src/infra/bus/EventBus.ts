import SourcedEvent from '../interface/SourcedEvent';

export default class EventBus {
  private events: SourcedEvent[];

  public constructor(){
    this.events = [];
  }

  public addEvent(event: SourcedEvent): void{
    this.events.push(event);
  }
  public process(): void{
    //TODO
  }
};