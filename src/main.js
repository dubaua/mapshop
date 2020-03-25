import 'normalize.css';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';

var mySwiper = new Swiper('[data-showcase-swiper]', {
  slidesPerView: 'auto',
  grabCursor: true,
  navigation: {
    nextEl: '[data-showcase-swiper-next]',
    prevEl: '[data-showcase-swiper-prev]',
  },
  pagination: {
    el: '[data-showcase-swiper-pagination]',
    clickable: true,
  },
});
