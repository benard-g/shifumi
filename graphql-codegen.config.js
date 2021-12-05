module.exports = {
  schema: 'schema.graphql',
  documents: 'apps/web-app/src/**/*.graphql',
  generates: {
    'apps/web-app/src/services/graphql/types.codegen.ts': {
      plugins: ['typescript'],
    },
    'apps/web-app/src/services/graphql/possibleTypes.codegen.ts': {
      plugins: ['fragment-matcher'],
    },
    'apps/web-app/src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'services/graphql/types.codegen.ts',
        extension: '.codegen.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};
