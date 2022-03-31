module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@assets": "./src/assets",
          "@atoms": "./src/components/atoms",
          "@molecules": "./src/components/molecules",
          "@navigator": "./src/navigator",
          "@organisms": "./src/components/organisms",
          "@store": "./src/store",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
          "@hooks": "./src/hooks",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
