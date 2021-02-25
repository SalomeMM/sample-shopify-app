// we need to give Polaris access to our API key:

require("dotenv").config(); // bring .env

const webpack = require("webpack"); 

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY); // create api key constant / this file has access to the api key

module.exports = { // with this we give Polaris (or any component we have) access to the shopify api key
    webpack: (config) => {
        const env = { API_KEY: apiKey };
        config.plugins.push(new webpack.DefinePlugin(env));
        return config;
    }
}