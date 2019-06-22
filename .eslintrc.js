const path = require("path")

module.exports = {
  root: true,
  // "parser": 'babel-eslint',
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true,
    node: true
  },
  extends: ["prettier", "plugin:vue/base", "airbnb-base"],
  // required to lint *.vue files
  plugins: [
    // "html",
    "import",
    "vue",
  ],
  settings: {
    "import/resolver": {
      webpack: {
        config: "webpack.common.js"
        // "prod": path.join(__dirname, "webpack.prod.js"),
      }
      // node: {
      //   paths: [
      //     path.resolve(__dirname),
      //     path.resolve(__dirname, 'app', 'vendor'),
      //     'node_modules',
      //   ],
      // }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        vue: "never"
      }
    ],
    "eqeqeq": "warn",
    "max-len": "warn",
    "no-shadow": [2, {allow: ["state"]}],
    "no-param-reassign": [2, {props: false}],
    "import/no-unresolved": "off",
    "function-paren-newline": [2, "never"],
    // "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
    "object-curly-spacing": [2, "never"],
    // "object-curly-newline": "off",
    "object-curly-newline": ["warn", {
      "ObjectExpression": {"consistent": true},
      "ObjectPattern": "never",
    }],
    // "import/extensions": [2, { "js": "always" }],
    // "import/no-unresolved": [2, "error"],// # hack until resolving import properly
    // "import/extensions": [2, "error"],// # hack until resolving import properly
    "import/no-extraneous-dependencies": "off",
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }],
    "prefer-const": ["warn", {"destructuring": "all"}],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
  },
  globals: {
    DEVELOPMENT: "readonly",
    APP_VERSION: "readonly",
    NODE_ENV: true,
  }
}
