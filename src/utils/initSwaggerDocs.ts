import {Service} from 'feathers-mongoose';

const initSwaggerDocs = (service: Service): void => {
  const Model = service.options.Model;
  if (!Model) return;

  const modelName = Model.modelName;
  if (!modelName) return;

  const schema = Model.schema;
  console.log(schema);
  if (!schema) return;

  const schemaJson = schema.jsonSchema();
  if (!schemaJson) return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  service.docs = {
    description: modelName,
    definition: {
      ...schemaJson,
    }
  };
};

export default initSwaggerDocs;
