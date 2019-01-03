const path = require("path");
const Html = require("html-webpack-plugin");
const MiniCSS = require("mini-css-extract-plugin");
const Compression = require("compression-webpack-plugin");
const Clean = require("clean-webpack-plugin");

module.exports = function(env) {
  const config = {};

  const isDev = env.dev ? true : false;
  const isProd = env.prod ? true : false;

  config.entry = "./src/index.js";
  config.output = {
    filename: isDev ? "[name].js" : "[name].[chunkhash].js",
    path: path.resolve(__dirname, "build")
  };

  config.mode = isProd ? "production" : "development";

  config.devtool = isProd ? false : "source-map";

  config.module = {};
  config.module.rules = [];

  const browsers = {
    dev: ["Chrome > 60"],
    prod: ["> 3%"]
  };

  const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: isDev ? browsers.dev : browsers.prod
              }
            }
          ],
          "@babel/preset-react"
        ],
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-throw-expressions",
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-syntax-import-meta",
          ["@babel/plugin-proposal-class-properties", { loose: false }],
          "@babel/plugin-proposal-json-strings",
        ],
      }
    }
  };
  config.module.rules.push(js);

  const scss = {
    test: /\.scss$/,
    use: [
      isProd ? MiniCSS.loader : "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: isProd ? false : true
        }
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: () => [
            new require("autoprefixer")({
              browsers: isProd ? browsers.prod : browsers.dev
            })
          ]
        }
      },
      "sass-loader"
    ]
  };

  config.module.rules.push(scss);

  const images = {
    test: /\.(jpg|jpeg|gif|png|csv)$/,
    use: {
      loader: "file-loader",
      options: {
        name: isProd ? "[name].[hash].[ext]" : "[name].[ext]",
        publicPath: "images",
        outputPath: "images"
      }
    }
  };

  config.module.rules.push(images);

  const fonts = {
    test: /\.(eot|ttf|woff|woff2)$/,
    use: {
      loader: "file-loader",
      options: {
        name: isProd ? "[name].[hash].[ext]" : "[name].[ext]",
        publicPath: "fonts",
        outputPath: "fonts"
      }
    }
  };

  config.module.rules.push(fonts);

  config.plugins = [];

  config.plugins.push(
    new Html({
      filename: "index.html",
      template: "./src/index.html",
      minify: false
    })
  );

  if (isProd) {
    config.plugins.push(new MiniCSS({ filename: "app.[chunkhash].css" }));

    config.plugins.push(
      new Compression({
        threshold: 0,
        minRatio: 0.8
      })
    );

    config.plugins.push(new Clean(["build"]));
  }

  if (isDev) {
    config.devServer = {
      port: 8080,
      progress: true,
      overlay: true
    };
  }

  return config;
};
