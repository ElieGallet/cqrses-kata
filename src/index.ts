const prompts = require('prompts');
import PortfoliosAggregateRoot from './core/domain/portfolios/aggregate/PortfoliosAggregateRoot';
import { LocalStorage } from "node-localstorage";
import DomainEventDispatcher from './infra/dispatcher/DomainEventDispatcher';
import CommandDispatcher from './infra/dispatcher/CommandDispatcher';
import UserInterfaceAdapter from './infra/adapter/input/UserInterfaceAdapter';
import EventStoreAdapter from './infra/adapter/output/EventStoreAdapter';
import ProjectionDatabaseAdapter from './infra/adapter/output/ProjectionDatabaseAdapter';
import CommandHandler from './infra/handler/CommandHandler';
import { Commands } from './types';
import Denormalizer from './infra/service/Denormalizer';
import DomainEventRepository from './infra/service/DomainEventRepository';
import QueryProcesser from './infra/service/QueryProcesser';
import DomainEventHandler from './infra/handler/DomainEventHandler';


const eventStore = new LocalStorage('./db/eventStore');
const projectionDatabase = new LocalStorage('./db/queryDatabase');
const eventStoreAdapter = new EventStoreAdapter(eventStore);
const projectionDatabaseAdapter = new ProjectionDatabaseAdapter(projectionDatabase);
const denormalizer = new Denormalizer(projectionDatabaseAdapter);
const domainEventDispatcher = new DomainEventDispatcher();
const domainEventRepository = new DomainEventRepository(eventStoreAdapter, domainEventDispatcher);
const commandDispatcher = new CommandDispatcher();

const portfoliosAggregateRoot = new PortfoliosAggregateRoot(domainEventRepository);
const commandHandler = new CommandHandler(portfoliosAggregateRoot);
const domainEventHandler = new DomainEventHandler(denormalizer);

const queryProcesser = new QueryProcesser();
const userInterfaceAdapter = new UserInterfaceAdapter(commandDispatcher, queryProcesser);

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
    commandHandler.startListening();
    domainEventHandler.startListening();
    while (!exit){
      exit = await run();
    }
    domainEventHandler.stopListening()
    commandHandler.stopListening();
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
  userInterfaceAdapter.handleUserRequest(Commands.TAKE_POSITION_IN_PORTFOLIO, {positionQuantity: positionInput.quantity, portfolioName: portfolioInput.name});
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
  userInterfaceAdapter.handleUserRequest(Commands.MOVE_POSITION_FROM_ONE_PORTFOLIO_TO_ANOTHER, {positionQuantity: position.quantity, portfolioSourceName: portfolioSource.name, portfolioDestinationName: portfolioDestination.name});
  console.log('position moved');
  
}
const getPositionListStep = async () => {
  
}
const getPortfolioListStep = async () => {
  
}
const getPortfolioDetailsStep = async () => {
  
}
