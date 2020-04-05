import Vue from 'vue/dist/vue.js';
import './catalog.scss';
import * as api from './api.js';

const catalogNode = document.getElementById('catalog');

if (catalogNode) {
  const catalogApp = new Vue({
    el: '#catalog',
    name: 'Catalog',
    data: {
      products: [],
      colorConfig: [],
      sizeConfig: [],
      sortingConfig: [],
      isFetching: false,
      filter: {
        sortingId: null,
        colorArray: [],
        sizeArray: [],
        isPortrait: true,
        priceFrom: null,
        priceTo: null,
      },
    },
    methods: {
      getColorStyle(color) {
        return `background-color: ${color}`;
      },
      getSize(width, height) {
        return this.filter.isPortrait ? `${width}×${height}` : `${height}×${width}`;
      },
      toggleColor(colorId) {
        this.filter.colorArray = this.toggleItemInArray(this.filter.colorArray, colorId).sort();
      },
      toggleSize(sizeId) {
        this.filter.sizeArray = this.toggleItemInArray(this.filter.sizeArray, sizeId).sort();
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
      isInArray(array, item) {
        return array.indexOf(item) !== -1;
      },
      async handleApplyFilter() {
        console.log(this.filter);
        this.isFetching = true;
        await this.fetchProducts();
        this.isFetching = false;
      },
      async fetchProducts() {
        const data = await api.fetchProducts(this.filter);
        this.products = data;
      },
    },
    async created() {
      this.colorConfig = await api.fetchColors();
      this.sizeConfig = await api.fetchSizes();
      this.sortingConfig = await api.fetchSorting();
      this.products = await api.fetchProducts(this.filter);
    },
  });
}
