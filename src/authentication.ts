import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    'v1/authentication': AuthenticationService & ServiceAddons<any>;
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authentication.docs = {
    description: 'Authentication',
    definition: {
      type: 'object',
      required: [
        'email', 'password'
      ],
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        }
      }
    }
  };

  app.use('/v1/authentication', authentication);
  app.configure(expressOauth());
}
