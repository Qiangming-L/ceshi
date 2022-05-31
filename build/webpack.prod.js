const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [new CleanWebpackPlugin(), new CssMinimizerPlugin()],
});

