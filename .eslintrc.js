export default {
   parser: '@typescript-eslint/parser',
   extends: [
      'plugin:prettier/recommended', // Enables ESLint rules from the Prettier plugin
      'plugin:@typescript-eslint/recommended', // Enables ESLint rules for TypeScript
      'eslint:recommended', // Enables basic ESLint rules
   ],
   plugins: ['@typescript-eslint', 'prettier'],
   parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      project: './tsconfig.json',
   },
   rules: {
      // You can add or customize ESLint rules here
   },
}
