import Message from "./Message";

export default interface SourcedEvent extends Message {
  type: string;
  timestamp: number;
  id: string;
  data: object;
}