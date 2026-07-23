/// <reference types="@tarojs/taro" />
declare module "*.css";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    TARO_ENV: "weapp" | "h5";
    TARO_APP_ID: string;
  }
}
