const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/index.js",
        install: "./src/js/install.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(_dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            chunks: ["main"],
        }),
        new WebpackPwaManifest({
            fingerprints: false,
            inject: true,
            name: "UTA Text Editor",
            short_name: "Text Editor",
            description: "Save Note Here",
            background_color: "#225ca3",
            start_url: "/",
            publicPath: "/",
            icons: [
                {
                    src: path.resolve("src/images/logo.png"),
                    sizes: [96, 128, 192, 256, 384, 512],
                    purpose: "any maskable",
                    destination: path.join("assets", "icons"),
                },
            ],
        }),
    ],
module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                optioins: {
                    presets: ["@babel/preset-env"],
                },
            },
        },
    ],
},
devServer: {
    static: {
        directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3004,
    hot: true,
    liveReload: true,
},
};