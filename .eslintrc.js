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
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true
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
        ]
    },
    "ignorePatterns": ['/node_modules/', '/specs/', './github/']
};


