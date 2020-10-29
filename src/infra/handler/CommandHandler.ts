import EventStoreAdapter from "../adapter/output/EventStoreAdapter";
import CommandPublisher from "../bus/CommandBus";
import EventBus from "../bus/EventBus";
import SourcedEvent from "../interface/SourcedEvent";
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
    const newEvents: SourcedEvent[] = this.commandBus.process();
    newEvents.forEach((event: SourcedEvent) => {
      this.eventBus.addEvent(event);
      this.eventStoreAdapter.storeEvent(event);
    });
    return newEvents.length > 0;
  }
}