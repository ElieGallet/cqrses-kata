// DOMAIN ENUMS
export enum Commands {
  TAKE_POSITION_IN_PORTFOLIO,
  MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER,
}
export enum Aggregates {
  PORTFOLIOS,
}
export enum DomainEvents {
  POSITION_TAKEN,
  POSITION_COUPLED_WITH_PORTFOLIO,
  POSITION_MOVED_FROM_ONE_PORTFOLIO_TO_ANOTHER
}
export enum Projections {
  TOTAL_POSITION_TAKEN,
  PORTFOLIO_NAME_LIST,
  PORTFOLIO_DETAILS
}
export enum Queries {
  GET_PORTFOLIO_POSITION_RATE,
  GET_TOTAL_POSITION_TAKEN,
  GET_PORTFOLIO_NAME_LIST,
  GET_PORTFOLIO_DETAILS,
}

// INFRA OBJECT TYPES
export type UserActionType = Queries | Commands;
export type DomainEventType = DomainEvents;
export type CommandType = Commands;
export type MessageType = DomainEvents | Commands;
export type QueryClassType = Queries;
export type ProjectionClassType = Projections;
export type AggregateClassType = Aggregates;

// INFRA OBJECT INTERFACE

export interface Projection {
  firstEventTimestamp: number;
  numberOfEvents: number;
  lastEventTimestamp: number;
  lastResetTimestamp: number;
}

// DOMAIN OBJECT INTERFACE
export interface Portfolio {
  positionQuantity: number;
  name: string;
}

// QUERY OBJECT INTERFACE
export interface PortfolioDetailsProjection extends Projection, Portfolio {}

export interface PortfolioNameListProjection extends Projection {
  names: string[];
}

export interface TotalPositionTakenProjection extends Projection {
  totalQuantity: string[];
}

// CLASS INTERFACE
export interface UserAction {
  type: UserActionType;
}

export interface Query {
  type: QueryClassType;
  resolve(): void;
}

export interface Message {
  type: MessageType;
}
export interface Command extends Message, UserAction {
  type: CommandType;
}

export interface DomainEvent extends Message {
  type: DomainEventType;
  timestamp: number;
  id: string;
  data: object;
}




