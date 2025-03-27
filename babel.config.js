module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          actions: './actions',
          api: './api',
          assets: './assets',
          components: './components',
          navigation: './navigation',
          reducers: './reducers',
          sagas: './sagas',
          screens: './screens',
          store: './store',
          utils: './utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};
