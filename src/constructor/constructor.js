import Vue from 'vue';
import Constructor from './Constructor.vue';
import L from 'leaflet';
import mapbox from 'mapbox.js';

Vue.use(L);
Vue.use(mapbox);

new Vue({
  el: '#constructor-app',
  render: h => h(Constructor),
});
