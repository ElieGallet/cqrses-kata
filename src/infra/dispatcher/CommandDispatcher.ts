import { EventEmitter } from 'events';
import { Command, Commands } from '../../types';

export default class CommandDispatcher {

  private emitter: EventEmitter;

  public constructor (){
    this.emitter = new EventEmitter();
  }

  public dispatchCommand(command: Command): boolean {
    return this.emitter.emit(Commands[command.type], command);
  }
};