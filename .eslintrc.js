module.exports = {
    "env": {
        "commonjs": true,
        "es2022": true,
        "jest": true,
        "browser": true,
    },
    "extends": [
        "eslint:recommended",
        "google"
    ],
    "parserOptions": {
        "parser": "@babel/eslint-parser",
        requireConfigFile: false,
        "ecmaVersion": 2022,
        "sourceType": "module",
        "allowImportExportEverywhere": true,
    },
    "rules": {
        "indent": [
            "error", 
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "camelcase": [
            "error"
        ],
        "no-duplicate-imports": [
            "error"
        ],
        "no-unused-vars":[
            "warn"
        ],
        "brace-style":[
            "error",
            "1tbs", { "allowSingleLine": true },
        ],
        "no-tabs": 0,
        "comma-dangle": [
            "error",
            "never"
        ],
        "eol-last": [
            "error",
            "never"
        ],
    },
    "globals": {
        "Animator": "writeable"
    },
    "ignorePatterns": ['/node_modules/', '/specs/', './github/']
};


