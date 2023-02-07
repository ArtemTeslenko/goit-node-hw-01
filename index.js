const logger = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      logger.listContacts().then(res => console.table(res));
      break;

    case 'get':
      logger.getContactById(id).then(res => console.table(res));
      break;

    case 'add':
      logger.addContact(name, email, phone).then(res => console.table(res));
      break;

    case 'remove':
      logger.removeContact(id).then(res => console.table(res));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
