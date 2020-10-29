import { EventEmitter } from 'events';
import { Command, Commands } from '../types';

export default class CommandPublisher {

  private emitter: EventEmitter;

  public constructor (){
    this.emitter = new EventEmitter();
  }

  public publishCommand(command: Command): boolean {
    return this.emitter.emit(Commands[command.type], command);
  }
};