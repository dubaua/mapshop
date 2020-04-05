import axios from 'axios';

const fakeTimeout = 618;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchColors() {
  // fake
  await timeout(Math.random() * fakeTimeout);

  // real
  // const { data } = await axios({
  //   type: 'POST',
  //   url: '/api/getColors',
  // });

  return [
    {
      color: '#000000',
      label: 'Черный',
      id: 1,
    },
    {
      color: '#ffffff',
      label: 'Белый',
      id: 2,
    },
    {
      color: '#ff0000',
      label: 'Красный',
      id: 3,
    },
  ];
}

export async function fetchSizes() {
  // fake
  await timeout(Math.random() * fakeTimeout);

  // real
  // const { data } = await axios({
  //   type: 'POST',
  //   url: '/api/getSizes',
  // });

  return [
    {
      width: 30,
      height: 40,
      id: 1,
    },
    {
      width: 50,
      height: 70,
      id: 2,
    },
    {
      width: 70,
      height: 100,
      id: 3,
    },
  ];
}

export async function fetchSorting() {
  // fake
  await timeout(Math.random() * fakeTimeout);

  // real
  // const { data } = await axios({
  //   type: 'POST',
  //   url: '/api/getSorting',
  // });

  return [
    {
      id: 1,
      label: 'дешевые',
    },
    {
      id: 2,
      label: 'дорогие',
    },
    {
      id: 3,
      label: 'маленькие',
    },
    {
      id: 4,
      label: 'большие',
    },
    {
      id: 5,
      label: 'портретные',
    },
    {
      id: 6,
      label: 'альбомные',
    },
  ];
}

export async function fetchProducts({ sortingId, colorArray, sizeArray, isPortrait, priceFrom, priceTo }) {
  // fake
  await timeout(Math.random() * fakeTimeout);

  // real
  // const { data } = await axios({
  //   type: 'POST',
  //   url: '/api/getProducts',
  //   data: { sortingId, colorArray, sizeArray, isPortrait, priceFrom, priceTo },
  // });

  return [
    {
      id: 1,
      photoUrl: '/src/images/square.jpg',
      title: '30×40, рамка БМГ, стекло',
      price: 1950,
    },
    {
      id: 2,
      photoUrl: '/src/images/square.jpg',
      title: '50×70, рамка БМГ, стекло',
      price: 2500,
    },
    {
      id: 3,
      photoUrl: '/src/images/square.jpg',
      title: '70×100, рамка БМГ, стекло',
      price: 5500,
    },
    {
      id: 4,
      photoUrl: '/src/images/square.jpg',
      title: '30×40, рамка БМГ, стекло',
      price: 1950,
    },
    {
      id: 5,
      photoUrl: '/src/images/square.jpg',
      title: '50×70, рамка БМГ, стекло',
      price: 2500,
    },
    {
      id: 6,
      photoUrl: '/src/images/square.jpg',
      title: '70×100, рамка БМГ, стекло',
      price: 5500,
    },
  ];
}
