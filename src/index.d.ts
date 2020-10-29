const prompts = require('prompts');
import PortfoliosAggregateRoot from './core/domain/aggregate/PortfoliosAggregateRoot';
import { LocalStorage } from "node-localstorage";
import CommandPublisher from './infra/bus/CommandBus';
import EventBus from './infra/bus/EventBus';
import UserInterfaceAdapter from './infra/adapter/input/UserInterfaceAdapter';
import Queryhandler from './core/service/QueryService';
import UserAction from "./infra/enum/UserAction";
import CommandHandler from './infra/handler/CommandHandler';
import EventStoreAdapter from './infra/adapter/output/EventStoreAdapter';
import QueryDatabaseAdapter from './infra/adapter/output/QueryDatabaseAdapter';

const eventStore = new LocalStorage('./db/eventStore');
const queryDatabase = new LocalStorage('./db/queryDatabase');
const eventStoreAdapter = new EventStoreAdapter(eventStore);
const queryDatabaseAdapter = new QueryDatabaseAdapter(queryDatabase);
const eventBus = new EventBus();
const commandBus = new CommandPublisher();
const commandHandler = new CommandHandler(commandBus, eventBus, eventStoreAdapter)
const portfoliosAggregateRoot = new PortfoliosAggregateRoot();
const queryhandler = new Queryhandler();
const userInterfaceAdapter = new UserInterfaceAdapter(commandBus, queryhandler);

console.log('Choose an action to do:');
console.log('1: Take a position');
console.log('2: Complete a Portfolio');
console.log('3: Move a Position from a Portfolio to another');
console.log('4: Get Position List');
console.log('5: Get Portfolio List');
console.log('6: Get Portfolio Details');
console.log('7: (debug) Get Event List in Database');
console.log('0: Exit');

const run = async (): Promise<boolean> => {
  let exit = false;
  const action = await prompts({
    type: 'number',
    name: 'value',
    message: 'Type an action number',
    validate: (value: number) => 0 > value || value > 7 ? `unknown action` : true
  });
  switch (action.value) {
    case 1:
      await takePositionInPortfolioStep();
      break;
    case 2:
      await movePositionFromPortfolioToAnother();
      break;
    case 3:
      await takePositionInPortfolioStep();
      break;
    case 4:
      await takePositionInPortfolioStep();
      break;
    case 5:
      await takePositionInPortfolioStep();
      break;
    case 6:
      await takePositionInPortfolioStep();
      break;
    case 7:
      console.log(eventStoreAdapter.fetchEventList());
      break;
    case 0:
      exit = true;
      break;
  }
  return exit;
}

(async () => {
  let exit;
  try{
    while (!exit){
      exit = await run();
      while (commandHandler.handle());
    }
    console.log('existing...');
    process.exit(0);
  } catch (e: any){
    console.log(e);
    process.exit(1);
  }

})();

const takePositionInPortfolioStep = async () => {
  const positionInput = await prompts({
    type: 'number',
    name: 'quantity',
    message: 'How much Position you want to take?',
    validate: (value: number) => value <= 0 ? `no negative or zero value` : true
  });
  const portfolioInput = await prompts({
    type: 'text',
    name: 'name',
    message: 'In which Portfolio?',
    validate: (value: string) => value === '' ? `cannot be empty` : true,
  });
  userInterfaceAdapter.handleUserRequest(UserAction.TAKE_POSITION_IN_PORTFOLIO, {positionQuantity: positionInput.quantity, portfolioName: portfolioInput.name});
  console.log('position taken');
}
const movePositionFromPortfolioToAnother = async () => {
  const position = await prompts({
    type: 'number',
    name: 'quantity',
    message: 'How much Position do you want to move?',
    validate: (value: number) => value <= 0 ? 'no negative or zero value' : true,
  });
  const portfolioSource = await prompts({
    type: 'text',
    name: 'name',
    message: 'From which Portfolio do you want to move this Position?',
    validate: (value: string) => value === '' ? `cannot be empty` : true,
  });
  const portfolioDestination = await prompts({
    type: 'text',
    name: 'name',
    message: 'To which Portfolio do you want to move this Position?',
    validate: (value: string) => value === '' ? `cannot be empty` : true,
  });
  userInterfaceAdapter.handleUserRequest(UserAction.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER, {positionQuantity: position.quantity, portfolioSourceName: portfolioSource.name, portfolioDestinationName: portfolioDestination.name});
  console.log('position moved');
  
}
const getPositionListStep = async () => {
  
}
const getPortfolioListStep = async () => {
  
}
const getPortfolioDetailsStep = async () => {
  
}
