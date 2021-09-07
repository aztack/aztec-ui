import { App, Plugin } from 'vue';
import { defineCustomElements, JSX as LocalJSX } from "aztec-ui/dist/loader";

declare global {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

export const IonicVue: Plugin = {
  async install(_: App) {
    if (typeof (window as any) !== 'undefined') {
      await defineCustomElements(window);
    }
  }
};
