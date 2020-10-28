import Command from "../../../infra/interface/Command";

export default class TakesPositionCommand implements Command{

  public quantity: number;

  public constructor(quantity: number){
    this.quantity = quantity;
  }
  public handle(){};
};