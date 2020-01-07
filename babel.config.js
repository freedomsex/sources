const presets = [
    ["@babel/env", {
      "modules": false,
    }],
  ];
const plugins = [
    "@babel/plugin-syntax-dynamic-import",
  ];

module.exports = { presets, plugins };
