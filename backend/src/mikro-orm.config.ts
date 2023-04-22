import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  clientUrl: 'postgresql://postgres:postgres@localhost:10432/foodprint',
  type: 'postgresql',
  baseDir: process.cwd(),
  metadataProvider: TsMorphMetadataProvider,
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;
