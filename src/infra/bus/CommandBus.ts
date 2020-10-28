import Command from '../interface/Command';

export default class CommandBus {

  private commands: Command[];

  public addCommand(command: Command): void{
    this.commands.push(command);
  }
  public process(): void{
    this.commands.shift().handle();
  }
};