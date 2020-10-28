import SourcedEvent from '../interface/SourcedEvent';

export default class EventBus {
  private events: SourcedEvent[];

  public addCommand(event: SourcedEvent): void{
    this.events.push(event);
  }
  public process(): void{
    this.events.shift().handle();
  }
};