declare module "*.less"; // css module 中声明使用
declare module '*.css';

declare const NODE_ENV: 'development' | 'production'; // 判断环境变量

declare const BASE: string; // BASE API地址使用 可以用来区分不同环境的 BASE API
