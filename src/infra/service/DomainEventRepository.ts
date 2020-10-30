import EventStoreAdapter from "../adapter/output/EventStoreAdapter";
import DomainEventDispatcher from "../dispatcher/DomainEventDispatcher";

export default class DomainEventRepository {

  private domainEventDispatcher: DomainEventDispatcher;
  private eventStoreAdapter: EventStoreAdapter;

  public constructor (eventStoreAdapter: EventStoreAdapter, domainEventDispatcher: DomainEventDispatcher){
    this.domainEventDispatcher = domainEventDispatcher;
    this.eventStoreAdapter = eventStoreAdapter;
  }
}