import Vue from 'vue/dist/vue.js';
import './catalog.scss';
import * as api from './api.js';

const catalogNode = document.getElementById('catalog');

if (catalogNode) {
  new Vue({
    el: '#catalog',
    name: 'Catalog',
    data: {
      products: [],
      isFetching: false,
      colorConfig: [],
      sizeConfig: [],
      orientationConfig: [],
      sortingConfig: [],
      filter: {
        sortingId: null,
        colors: [],
        sizes: [],
        orientations: [],
      },
    },
    methods: {
      getColorStyle(color) {
        return `background-color: #${color}`;
      },
      getSize(width, height) {
        return this.filter.isPortrait ? `${width}×${height}` : `${height}×${width}`;
      },
      toggleInArray(arrayKey, item) {
        this.filter[arrayKey] = this.toggleItemInArray(this.filter[arrayKey], item).sort();
      },
      setSorting(sortingId) {
        this.filter.sortingId = sortingId;
      },
      toggleItemInArray(array, item) {
        const index = array.indexOf(item);
        if (index === -1) {
          return [...array, item];
        }
        return [...array.slice(0, index), ...array.slice(index + 1)];
      },
      isInArray(arrayKey, item) {
        return this.filter[arrayKey].indexOf(item) !== -1;
      },
      async handleApplyFilter() {
        this.isFetching = true;
        await this.fetchProducts();
        this.isFetching = false;
      },
      async fetchProducts() {
        const data = await api.getProducts(this.filter);
        this.products = data;
      },
    },
    async created() {
      this.colorConfig = await api.getColors();
      this.orientationConfig = await api.getOrientations();
      this.sizeConfig = await api.getSizes();
      this.sortingConfig = await api.getSorting();
      this.products = await api.getProducts(this.filter);
    },
  });
}
