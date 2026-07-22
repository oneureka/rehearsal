import path from "path"
import { defineConfig, type UserConfigExport } from "@tarojs/cli";

import devConfig from "./dev";
import prodConfig from "./prod";

export default defineConfig<"vite">(async (merge, {}) => {
  const baseConfig: UserConfigExport<"vite"> = {
    projectName: "rehearsal",
    date: "2026-3-30",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: ["@tarojs/plugin-generator"],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: "vite",
    alias: {
      "@/assets": path.resolve(__dirname, "..", "src/assets"),
      "@/components": path.resolve(__dirname, "..", "src/components"),
      "@/constants": path.resolve(__dirname, "..", "src/constants"),
      "@/pages": path.resolve(__dirname, "..", "src/pages"),
      "@/services": path.resolve(__dirname, "..", "src/services"),
      "@/stores": path.resolve(__dirname, "..", "src/stores"),
      "@/types": path.resolve(__dirname, "..", "src/types"),
      "@/utils": path.resolve(__dirname, "..", "src/utils"),
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: "module",
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: "module",
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false,
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  if (process.env.NODE_ENV === "development") {
    return merge({}, baseConfig, devConfig);
  }

  return merge({}, baseConfig, prodConfig);
});
