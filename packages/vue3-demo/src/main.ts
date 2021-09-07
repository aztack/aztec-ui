import { IonicVue } from './../../vue/src/register-wc';
import { createApp, h } from 'vue'
import App from './App.vue'

const app = createApp({
  render: () => h(App),
  whitespace: 'preserve'
});
//@ts-ignore
app.use(IonicVue);
app.mount('#app');
