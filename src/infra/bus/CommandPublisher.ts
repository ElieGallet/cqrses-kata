import Command from '../interface/Command';
import SourcedEvent from '../interface/SourcedEvent';
import { EventEmitter } from 'events';

export default class CommandPublisher {

  private commands: Command[];
  private emitter: EventEmitter;

  public constructor (){
    this.commands = [];
    this.emitter = new EventEmitter();
  }

  public publishCommand(command: Command): void{
    this.emitter.emit(command.type)
  }

  public process(): SourcedEvent[]{
    const command = this.commands.shift();
    return command ? command.handle() : [];
  }
};