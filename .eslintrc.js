module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true,
        "browser": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "ignorePatterns": ['/node_modules/', '/specs/', './github/']
};