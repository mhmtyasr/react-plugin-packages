const webpack = require("webpack");
var packageJson = require("./package.json");
var version = packageJson.version;
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");

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
      path: require.resolve("path-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      assert: false,
      util: false,
      url: false,
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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
    filename: `./build/${packageJson.libraryName}@${version}.js`,
  },
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs: "react-dom",
      commonjs2: "react-dom",
    },
    antd : {
      root: "antd",
      commonjs: "antd",
      commonjs2: "antd",
    },
  },
});
