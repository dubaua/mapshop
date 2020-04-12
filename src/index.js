import Swiper from 'swiper';
import 'normalize.css';
import 'swiper/css/swiper.min.css';
import '@/styles/main.scss';
import './constructor/constructor.js';
import './catalog/catalog.js';

const shortcutsSwiper = new Swiper('[data-shortcuts-swiper]', {
  slidesPerView: 1,
  breakpoints: {
    1200: {
      slidesPerView: 'auto',
    },
  },
  grabCursor: true,
  navigation: {
    nextEl: '[data-shortcuts-swiper-next]',
    prevEl: '[data-shortcuts-swiper-prev]',
  },
  pagination: {
    el: '[data-shortcuts-swiper-pagination]',
    clickable: true,
  },
});
