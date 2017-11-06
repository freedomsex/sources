module.exports = {
  "root": true,
  "parser": 'babel-eslint',
  "env": {
    "browser": true,
    "node": true
  },
  "extends": 'airbnb-base',
  // required to lint *.vue files
  "plugins": [
    "html",
    "import",
  ],
  // add your custom rules here
  "rules": {
    "no-shadow": [2, {"allow": ["state"]}],
    "no-param-reassign": [2, { "props": false }],
    "import/no-unresolved": "off",
    "function-paren-newline": [2, "never"],
    "eqeqeq": "off",
    // "import/extensions": [2, { "js": "always" }],
  },
  "globals": {}
};
