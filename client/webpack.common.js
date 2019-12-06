const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "./template/theme.less"), "utf8")
);

module.exports = {
  entry: [
    "webpack-dev-server/client?http://" + require("os").hostname() + ":9090/",
    path.resolve(__dirname, "src/index.js")
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "src",
    historyApiFallback: true
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      application: path.resolve(__dirname, "src/application/"),
      pages: path.resolve(__dirname, "src/application/pages"),
      config: path.resolve(__dirname, "src/config/"),
      services: path.resolve(__dirname, "src/services/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      utils: path.resolve(__dirname, "src/utils/")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: "Obah",
      template: "./template/index.html",
      filename: "./index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#4285f4"
      }
    })
  ]
};
