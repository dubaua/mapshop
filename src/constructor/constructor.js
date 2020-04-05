import Vue from 'vue/dist/vue.js';
import './constructor.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapbox from 'mapbox.js';

Vue.use(L);
Vue.use(mapbox);

const appNode = document.getElementById('constructor-app');

if (appNode) {
  var kek = new Vue({
    el: '#constructor-app',
    name: 'MapConstructor',
    data: {
      form: {
        mapData: {
          lat: 55,
          lng: 37,
          zoom: 16,
        },
        searchQuery: null,
        style: 0,
        theme: 0,
        size: 0,
        orientation: 0,
        material: 0,
        frame: 0,
        text: {
          title: 'Челябинск',
          divider: 'Россия',
          subtitle: '55.164°N / 61.436°E',
        },
      },
      mapStyles: [
        {
          value: 0,
          name: 'scandi',
          label: 'Scandi',
        },
        {
          value: 1,
          name: 'asphalt',
          label: 'Asphalt',
        },
        {
          value: 2,
          name: 'blue',
          label: 'Blue',
        },
      ],
      mapThemes: [
        {
          value: 0,
          name: 'classic',
          label: 'Классицизм',
        },
        {
          value: 1,
          name: 'minimal',
          label: 'Минимализм',
        },
        {
          value: 2,
          name: 'shok-content',
          label: 'Авангард',
        },
      ],
      posterSizes: [
        {
          value: 0,
          label: '30x40см',
          price: 0,
        },
        {
          value: 1,
          label: '50x70см',
          price: 600,
        },
        {
          value: 2,
          label: '70x100см',
          price: 3000,
        },
      ],
      posterMaterials: [
        {
          value: 0,
          name: 'paper',
          description: 'Фотобумага музейного качества, матовая с антибликовым покрытием',
          label: 'Бумага',
          price: 0,
        },
        {
          value: 1,
          name: 'canvas',
          description: 'Хороший холст',
          label: 'Холст на подрамнике',
          price: 1000,
        },
      ],
      posterFrames: [
        {
          value: 0,
          name: 'withot-frame',
          price: 0,
          label: 'Без рамки',
        },
        {
          value: 1,
          name: 'black',
          price: 900,
          label: 'Черная',
        },
        {
          value: 1,
          name: 'white',
          price: 900,
          label: 'Белая',
        },
      ],
      startPrice: 1990,
    },
    methods: {
      onSizeChange({ target }) {
        this.form.size = parseFloat(target.value);
      },
      onStyleChange({ target }) {
        this.form.style = parseFloat(target.value);
      },
      onThemeChange({ target }) {
        this.form.theme = parseFloat(target.value);
      },
      onMaterialChange({ target }) {
        this.form.material = parseFloat(target.value);
      },
      onFrameChange({ target }) {
        this.form.frame = parseFloat(target.value);
      },
      handleForm() {
        console.log('handleForm', this.formData);
      },
      useUserLocation() {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            this.form.mapData.lat = position.coords.latitude;
            this.form.mapData.lng = position.coords.longitude;
            console.log(position.coords.latitude, position.coords.longitude);
          });
        }
      },
    },
    computed: {
      searchInput: {
        get() {
          return this.form.searchQuery;
        },
        set(newVal) {
          this.form.searchQuery = newVal;
        },
      },
      posterPrice() {
        const sizePrice = this.posterSizes[this.form.size].price;
        const materialPrice = this.posterMaterials[this.form.material].price;
        const framePrice = this.posterFrames[this.form.frame].price;
        return this.startPrice + sizePrice + materialPrice + framePrice;
      },
      formData() {
        return {
          lat: this.form.mapData.lat,
          lng: this.form.mapData.lng,
          zoom: this.form.mapData.zoom,
          style: this.form.style,
          theme: this.form.theme,
          size: this.form.size,
          orientation: this.form.orientation,
          material: this.form.material,
          frame: this.form.frame,
          text: {
            title: this.form.title,
            divider: this.form.divider,
            subtitle: this.form.subtitle,
          },
        };
      },
    },
    mounted() {
      // TODO определять местоположение юзера, отражать на карте и в тексте
      this.$nextTick(() => {
        // L.mapbox.accessToken =
        //   'pk.eyJ1IjoicHJhbWF0dGkiLCJhIjoiY2syb2hiOHJoMDVzYTNtcHBocnB0bnRhaSJ9.zYNWx4wkEu8jXQW4PrpNRQ';
        // L.mapbox
        //   .map('constructor-map', 'mapbox.streets')
        //   .setView([this.form.mapData.lat, this.form.mapData.lng], this.form.mapData.zoom);
        // this.useUserLocation();
      });
    },
  });
}

var map = L.map('constructor-map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

setTimeout(() => {
  map.invalidateSize(true);
}, 500);
