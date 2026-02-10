import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import stylisticPlugin from '@stylistic/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsparser from '@typescript-eslint/parser';
import storybook from 'eslint-plugin-storybook';

export default [
	{
		ignores: ['node_modules/', 'dist/', 'packages/*/dist/', '.astro/', '.storybook/', 'packages/*/.storybook/', 'worker-configuration.d.ts'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended.map(config => ({
		...config,
		files: ['**/*.{ts,tsx,astro}'],
	})),
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsparser,
		},
	},
	{
		files: ['**/*.{jsx,tsx}'],
		...reactPlugin.configs.flat.recommended,
		...reactPlugin.configs.flat['jsx-runtime'],
		...reactHooks.configs['recommended-latest'],
		plugins: {
			'react': reactPlugin,
			'react-hooks': reactHooks,
		},
	},
	{
		files: ['**/*.{js,ts,jsx,tsx,astro}'],
		plugins: {
			'@stylistic': stylisticPlugin,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'no-unused-vars': [ 'warn', { args: 'none' } ],
			'no-use-before-define': [ 'error', { functions: false } ],
			'prefer-const': [ 'warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],
			'no-invalid-this': 'error',
			'no-shadow': 'warn',
			'@stylistic/no-extra-semi': 'warn',
			'@stylistic/semi': [ 'warn', 'always', { omitLastInOneLineBlock: true } ],
			'@stylistic/comma-dangle': [ 'warn', 'always-multiline' ],
			'@stylistic/quotes': [ 'warn', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' } ],
			'@stylistic/jsx-quotes': [ 'warn', 'prefer-double' ],
			'@stylistic/eol-last': [ 'warn', 'always' ],
			'@stylistic/no-trailing-spaces': 'warn',
		},
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
	},
	{
		files: ['**/*.{js,ts,astro}'],
		ignores: ['**/src/lib/client/*.{js,ts}'],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},
	{
		files: ['**/*.{ts,tsx,astro}'],
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [ 'warn', { args: 'none' } ],
			'no-use-before-define': 'off',
			'@typescript-eslint/no-use-before-define': [ 'error', { functions: false } ],
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'warn',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},
	{
		files: ['**/*.{jsx,tsx}'],
		languageOptions: {
			...reactPlugin.configs.flat.recommended.languageOptions,
			ecmaVersion: 2022,
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'react/jsx-uses-vars': 'error',
		},
	},
	{
		files: ['**/src/lib/client/*.js'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: ['**/*.cjs'],
		languageOptions: {
			sourceType: 'commonjs',
		},
	},
	...storybook.configs['flat/recommended'],
];
