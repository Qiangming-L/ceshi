declare module '*.vue' {
  import { ComponentOptions, DefineComponent } from 'vue';
  const componentOptions: DefineComponent<{}, {}, any>;
  export default componentOptions;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
