// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

// const config = getDefaultConfig(__dirname)

// module.exports = withNativeWind(config, { input: './global.css' })

// const { getDefaultConfig } = require("expo/metro-config");

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer")
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg"]
//   };

//   return config;
// })();


const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  // Apply NativeWind configuration
  const configWithNativeWind = withNativeWind(defaultConfig, { input: './global.css' });

  // Modify resolver and transformer for SVG support
  const { transformer, resolver } = configWithNativeWind;

  const modifiedTransformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };

  const modifiedResolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  // Update the configuration with modified resolver and transformer
  const updatedConfig = {
    ...configWithNativeWind,
    transformer: modifiedTransformer,
    resolver: modifiedResolver
  };

  return updatedConfig;
})();
