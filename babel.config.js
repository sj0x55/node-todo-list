module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 Chrome versions'],
          node: 14,
        },
      },
    ],
  ],
  plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
};
