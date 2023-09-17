module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        babelOptions: {
            // configFile: './babel.config.json'
            configFile: '/Users/ruaewr4/frontend/excel-course/babel.config.json'
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended', 'google'],
    rules: {
        'indent': 'off',
        'semi': 'off',
        'comma-dangle': 'off',
        'require-jsdoc': 'off',
        'operator-linebreak': 'off',
        'no-unused-vars': 'off',
    }
}


