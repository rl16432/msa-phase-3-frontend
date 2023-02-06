const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-actions',
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-viewport',
  ],
  "framework": "@storybook/react",
  features: {
    interactionsDebugger: true,
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.module\.css$/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
}