import { Config } from '@stencil/core';
import { stylus } from '@stencil/stylus';

export const config: Config = {
  namespace: 'aztec-ui',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    stylus()
  ],
  globalScript: 'src/global/global-script.ts',
  globalStyle: 'src/global/variables.styl'
};
