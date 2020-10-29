import EventStoreAdapter from "../adapter/output/EventStoreAdapter";
import CommandPublisher from "../publisher/CommandBus";
import EventBus from "../publisher/EventBus";
import DomainEvent from "../interface/DomainEvent";
export default class CommandHandler {

  private commandBus: CommandPublisher;
  private eventBus: EventBus;
  private eventStoreAdapter: EventStoreAdapter;

  public constructor(commandBus: CommandPublisher, eventBus: EventBus, eventStoreAdapter: EventStoreAdapter) {
    this.commandBus = commandBus;
    this.eventBus = eventBus;
    this.eventStoreAdapter = eventStoreAdapter;
  }

  public handle(): boolean{
    const newEvents: DomainEvent[] = this.commandBus.process();
    newEvents.forEach((event: DomainEvent) => {
      this.eventBus.addEvent(event);
      this.eventStoreAdapter.storeEvent(event);
    });
    return newEvents.length > 0;
  }
}