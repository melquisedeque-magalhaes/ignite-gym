module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@typings': './src/typings',
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@utils': './src/utils',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
            '@validators': './src/validators',
          }
        },
      ],
    ],
  };
};
