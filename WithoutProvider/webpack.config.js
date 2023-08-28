const webpack = require("webpack");
var packageJson = require("./package.json");
var version = packageJson.version;
const Dotenv = require("dotenv-webpack");

module.exports = (env) => ({
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      querystring: require.resolve("querystring-es3"),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: env.ENV,
    }),
    new Dotenv({
      path: `./.env.${env.ENV}`,
    }),
  ],
  output: {
    library: `${packageJson.libraryName}`,
    libraryTarget: "umd",
    path: __dirname,
    filename: `./build/${packageJson.libraryName}@${packageJson.version}.js`,
  },
  externals: {
    "antd": {
      root: "Antd",
      commonjs: "antd",
      commonjs2: "antd",
    },
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    
  }
});
