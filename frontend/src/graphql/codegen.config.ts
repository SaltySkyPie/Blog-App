import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3001/graphql',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  // debug: true,
  // verbose: true,
  generates: {
    'src/graphql/graphql.schema.json': {
      plugins: ['introspection'],
    },
    'src/graphql/types.ts': {
      presetConfig: {
        namingConvention: 'keep',
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
