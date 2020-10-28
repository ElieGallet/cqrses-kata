const prompts = require('prompts');
import PortfoliosAggregateRoot from './core/domain/aggregate/PortfoliosAggregateRoot';
import { LocalStorage } from "node-localstorage";
import CommandBus from './infra/bus/CommandBus';
import EventBus from './infra/bus/EventBus';
import PositionsAggregateRoot from './core/domain/aggregate/PositionsAggregateRoot';
import UserInterfaceAdapter from './infra/adapter/input/UserInterfaceAdapter';
import Queryhandler from './infra/handler/QueryHandler';
import UserAction from "./infra/enum/UserAction";

const eventStore = new LocalStorage('../db/eventStore');
const queryDatabase = new LocalStorage('../db/queryDatabase');
const eventBus = new EventBus();
const commandBus = new CommandBus();
const portfoliosAggregateRoot = new PortfoliosAggregateRoot();
const positionsAggregateRoot = new PositionsAggregateRoot();
const queryhandler = new Queryhandler();
const userInterfaceAdapter = new UserInterfaceAdapter(commandBus, queryhandler);

console.log('Choose an action to do:');
console.log('1: Take a position');
console.log('2: Complete a Portfolio');
console.log('3: Move a Position to a Portfolio');
console.log('4: Get Position List');
console.log('5: Get Portfolio List');
console.log('6: Get Portfolio Details');
console.log('7: Exit');

const run = async (): Promise<boolean> => {
  let exit = false;
  const action = await prompts({
    type: 'number',
    name: 'value',
    message: 'Type an action number',
    validate: (value: number) => 1 > value || value > 7 ? `unknown action` : true
  });
  switch (action.value) {
    case 1:
      await takePositionStep();
      break;
    case 2:
      await takePositionStep();
      break;
    case 3:
      await takePositionStep();
      break;
    case 4:
      await takePositionStep();
      break;
    case 5:
      await takePositionStep();
      break;
    case 6:
      await takePositionStep();
      break;
    case 7:
      exit = true;
      break;
  }
  return exit;
}

(async () => {
  let exit;
  while (!exit){
    exit = await run();
    console.log(exit);
  }
})();

const takePositionStep = async () => {
  const input = await prompts({
    type: 'number',
    name: 'value',
    message: 'Position Volume',
    validate: (value: number) => value < 0 ? `no negative value` : true
  });
  userInterfaceAdapter.handleRequest(UserAction.TAKE_POSITION, {volume: input.value});
}
const completePositionStep = async () => {
  
}
const movePositionToPortfolioStep = async () => {
  
}
const getPositionListStep = async () =>{
  
}
const getPortfolioListStep = async () => {
  
}
const getPortfolioDetailsStep = async () => {
  
}
