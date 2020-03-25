import 'normalize.css';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';

var shortcutsSwiper = new Swiper('[data-shortcuts-swiper]', {
  slidesPerView: 'auto',
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

var showcaseSwiper = new Swiper('[data-showcase-swiper]', {
  slidesPerView: 3,
  grabCursor: true,
  navigation: {
    nextEl: '[data-showcase-swiper-next]',
    prevEl: '[data-showcase-swiper-prev]',
  },
});
