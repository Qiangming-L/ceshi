const path = require("path");
const HtmlWebpackPlguin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const Components = require("unplugin-vue-components/webpack");
// const { ResolverName } = require("unplugin-vue-components/resolvers"); //https://github.com/antfu/unplugin-vue-components

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "./dist"),
    chunkFilename: "js/[name].[hash].chunk.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".vue"],
    alias: { "@": path.resolve("../src") },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // exclude: /node_modules/,
        use: "vue-loader",
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        // exclude: /node_modules/,
      },
      {
        test: "/.css$/",
        // exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["src/assets/common.scss"],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, "./src/icon")],
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              symbolId: "icon-[name]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[base]",
        },
        exclude: [path.resolve(__dirname, "./src/icons")],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "files/[base]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "media/[base]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlguin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css",
    }),
    Components({ dts: true }),
  ],
};

