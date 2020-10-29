import {v4 as uuid} from 'uuid';
import { LocalStorage } from "node-localstorage";
import SourcedEvent from "../../interface/SourcedEvent";

export default class EventStoreAdapter {

  private readonly eventIndexKey = "index";
  private eventStore: LocalStorage;

  public constructor(eventStore: LocalStorage){
    this.eventStore = eventStore;
    if (!eventStore.getItem(this.eventIndexKey)){
      this.eventStore.setItem(this.eventIndexKey, JSON.stringify([]));
    }
  }

  public storeEvent (event: SourcedEvent): void {
    this.eventStore.setItem(event.id, JSON.stringify(event));
    const eventIdList = JSON.parse(this.eventStore.getItem(this.eventIndexKey)) as string[];
    eventIdList.push(event.id);
    this.eventStore.setItem(this.eventIndexKey, JSON.stringify(eventIdList));
  }

  public fetchEvent (eventId: string): SourcedEvent {
    return JSON.parse(this.eventStore.getItem(eventId)) as SourcedEvent;
  }

  public fetchEventList (): SourcedEvent[] {
    const eventIdList = JSON.parse(this.eventStore.getItem(this.eventIndexKey));
    return eventIdList.map((eventId: string) => JSON.parse(this.eventStore.getItem(eventId)) as SourcedEvent);
  }
}