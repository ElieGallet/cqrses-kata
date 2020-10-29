export enum Queries {
  GET_TOTAL_POSITION_TAKEN,
  GET_PORTFOLIO_LIST,
  GET_PORTFOLIO_DETAILS,
}
export enum Commands {
  TAKE_POSITION_IN_PORTFOLIO,
  MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER,
}
export enum UserActions {
  Commands,
  Queries,
}

export type CommandType = Commands;
export type QueryType = Queries;

export interface Message {}
export interface Command extends Message {
  type: CommandType;
}
export interface DomainEvent extends Message {
  type: string;
  timestamp: number;
  id: string;
  data: object;
}
export interface Query {
  type: QueryType;
  resolve(): void;
}



