module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@env': './env', // Alias for your env file
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        '@babel/plugin-transform-runtime', // Add this line to include the runtime plugin
        {
          regenerator: true, // Enable regeneratorRuntime support
        },
      ],
    ],
  };
};
