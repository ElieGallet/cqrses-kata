import {v4 as uuid} from 'uuid';
import { LocalStorage } from "node-localstorage";
import DomainEvent from "../../interface/DomainEvent";

export default class EventStoreAdapter {

  private readonly eventIndexKey = "index";
  private eventStore: LocalStorage;

  public constructor(eventStore: LocalStorage){
    this.eventStore = eventStore;
    if (!eventStore.getItem(this.eventIndexKey)){
      this.eventStore.setItem(this.eventIndexKey, JSON.stringify([]));
    }
  }

  public storeEvent (event: DomainEvent): void {
    this.eventStore.setItem(event.id, JSON.stringify(event));
    const eventIdList = JSON.parse(this.eventStore.getItem(this.eventIndexKey)) as string[];
    eventIdList.push(event.id);
    this.eventStore.setItem(this.eventIndexKey, JSON.stringify(eventIdList));
  }

  public fetchEvent (eventId: string): DomainEvent {
    return JSON.parse(this.eventStore.getItem(eventId)) as DomainEvent;
  }

  public fetchEventList (): DomainEvent[] {
    const eventIdList = JSON.parse(this.eventStore.getItem(this.eventIndexKey));
    return eventIdList.map((eventId: string) => JSON.parse(this.eventStore.getItem(eventId)) as DomainEvent);
  }
}