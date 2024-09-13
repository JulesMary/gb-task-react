module.exports = {
    root: true,
    env: {browser: true, es2020: true, jest: true},
    plugins: ['prettier', '@typescript-eslint', 'react-refresh'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', "**/*.spec.ts", "**/*.d.ts", "playwright.config.ts"],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './',
    },
    rules: {
        'prettier/prettier': 'warn',
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-misused-promises":
            [2, {
                "checksVoidReturn": {
                    "attributes": false
                }
            }],
        "react/react-in-jsx-scope": "off",
        // '@typescript-eslint/explicit-function-return-type': 'warn',
        // '@typescript-eslint/explicit-module-boundary-types': 'warn',
        // '@typescript-eslint/no-explicit-any': 'warn',
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
    },
}
