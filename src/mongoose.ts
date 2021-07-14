import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongooseSchemaJsonschema from 'mongoose-schema-jsonschema';


export default function (app: Application): void {
  mongoose.connect(
    app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  mongooseSchemaJsonschema(mongoose);

  app.set('mongooseClient', mongoose);
}
