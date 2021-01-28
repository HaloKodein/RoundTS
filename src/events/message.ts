import CommandsHandler from '../services/handler-commands';
export = async (client, message) => new CommandsHandler(client, message);