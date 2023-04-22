import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  clientUrl: 'postgresql://postgres:postgres@localhost:10432/foodprint',
  type: 'postgresql',
  metadataProvider: TsMorphMetadataProvider,
};

export default config;
