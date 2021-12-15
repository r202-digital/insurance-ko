const path = require("path");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = {
  target: "serverless",
  // swcMinify: true,
  webpack: (config) => {
    config.resolve.modules.push(path.resolve("./"));
    config.plugins = config.plugins || [];
    config.plugins.push(new CaseSensitivePathsPlugin());
    return config;
  },
  images: {
    domains: ["images.prismic.io"],
  },
};
