/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

// /////////////////////////////////////
// Defaults
// /////////////////////////////////////

const defaults = {
    mode: "development",
    context: __dirname,
    entry: {
        index: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: "Tone",
        libraryTarget: "umd",
        globalObject: "typeof self !== 'undefined' ? self : this",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /(node_modules)/,
            }
        ]
    },
    devtool: "cheap-source-map",
};

// /////////////////////////////////////
// Scratch
// /////////////////////////////////////


// /////////////////////////////////////
// Tests
// /////////////////////////////////////

// /////////////////////////////////////
// Production
// /////////////////////////////////////

const production = Object.assign({}, defaults, {
    mode: "production",
    devtool: "source-map",
});

module.exports = env => {

        return production;

};
