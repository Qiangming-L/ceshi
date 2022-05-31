import { createApp } from 'vue';
import VueGoogleMaps from '@fawmi/vue-google-maps';

import { store, key } from './store';

import router from './routes';

import App from './App';

createApp(App)
  .use(router)
  .use(store, key)
  .use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyA1Krb9T9-F1KMysusQqc3b_Hk6YRL-0YU',
    },
  })
  .mount('#app');
