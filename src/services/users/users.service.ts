// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/users.model';
import hooks from './users.hooks';
import initSwaggerDocs from '../../utils/initSwaggerDocs';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'v1/users': Users & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const userService = new Users(options, app);

  initSwaggerDocs(userService);

  // Initialize our service with any options it requires
  app.use('/v1/users', userService);

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/users');

  service.hooks(hooks);
}
