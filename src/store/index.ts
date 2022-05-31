import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';

import global from './modules/global';
import map from './modules/map';

// if (module.hot) {
//   module.hot.accept([], () => {
//     const newMutations = require('./mutations').default;
//     const newModuleA = require('./modules/a').default;
//     store.hotUpdate({
//       mutations: newMutations,
//       modules: {
//         a: newModuleA,
//       },
//     });
//   });
// }

export const key: InjectionKey<Store<any>> = Symbol();

export const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedstate({
      key: 'saveInfo',
    }),
  ],
  ...global,
  modules: {
    map,
  },
});

export function useStore() {
  return baseUseStore(key);
}
