module.exports = {
  "plugins": ["@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-proposal-async-generator-functions"],
  "presets": [
    "@babel/preset-env",
    // '@vue/cli-plugin-babel/preset',
    [
      '@vue/app',
      {
        "useBuiltIns": 'entry'
      }
    ]
  ]
}
