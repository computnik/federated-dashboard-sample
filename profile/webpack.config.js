const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3004,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    publicPath: "auto",
    chunkFilename: "[id].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile",
      filename: "remoteEntry.js",
      remotes: {
        shell: `shell@${getRemoteEntryUrl(3000)}`,
      },
      exposes: {
        "./ProfilePage": "./src/ProfilePage",
      },
      shared: [
        {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

//        app2: `app2@${getRemoteEntryUrl(3002)}`,
function getRemoteEntryUrl(port) {
  const { CODESANDBOX_SSE, HOSTNAME = "" } = process.env;

  // Check if the example is running on codesandbox
  // https://codesandbox.io/docs/environment
  if (!CODESANDBOX_SSE) {
    return `//localhost:${port}/remoteEntry.js`;
  }

  const parts = HOSTNAME.split("-");
  const codesandboxId = parts[parts.length - 1];

  return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}
