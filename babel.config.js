module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api-hooks': './src/api/hooks',
          '@api-requests': './src/api/requests',
          '@icons': './src/assets/icons',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@hoc': './src/hoc',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
