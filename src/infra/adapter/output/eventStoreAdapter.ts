import uuid from 'uuid';
import { LocalStorage } from "node-localstorage";
import SourcedEvent from "../../interface/SourcedEvent";

export default class EventStoreAdapter {

  private readonly eventListId = uuid.v4();
  private eventStore: LocalStorage;

  public constructor(eventStore: LocalStorage){
    this.eventStore = eventStore;
  }

  public storeEvent (event: SourcedEvent): void {
    const eventId = uuid.v4();
    this.eventStore.setItem(eventId, JSON.stringify(event));
    const eventIdList = JSON.parse(this.eventStore.getItem(this.eventListId)) as string[];
    eventIdList.push(eventId);
    this.eventStore.setItem(this.eventListId, JSON.stringify(eventIdList));
  }

  public fetchEvent (eventId: string): SourcedEvent {
    return JSON.parse(this.eventStore.getItem(eventId)) as SourcedEvent;
  }

  public fetchEventList (): SourcedEvent[] {
    const eventIdList = JSON.parse(this.eventStore.getItem(this.eventListId));
    return eventIdList.map((eventId: string) => JSON.parse(this.eventStore.getItem(eventId)) as SourcedEvent);
  }
}