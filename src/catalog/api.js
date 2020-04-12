import axios from 'axios';

const apiClient = axios.create({
  // конфиг тут
});

export async function getColors() {
  const { data } = await apiClient({
    method: 'POST',
    url: '/umbraco/api/taxonomy/getColors',
  });
  return data;
}

export async function getSizes() {
  const { data } = await apiClient({
    method: 'POST',
    url: '/umbraco/api/taxonomy/getSizes',
  });
  return data;
}

export async function getSorting() {
  const { data } = await apiClient({
    method: 'POST',
    url: '/umbraco/api/taxonomy/getSorting',
  });
  return data;
}

export async function getOrientations() {
  const { data } = await apiClient({
    method: 'POST',
    url: '/umbraco/api/taxonomy/getOrientations',
  });
  return data;
}

export async function getProducts({ 
  sortingId,
  colors,
  sizes,
  orientations,
}) {
  const { data } = await apiClient({
    method: 'POST',
    url: '/umbraco/api/Product/GetProducts',
    data: {
      sortingId,
      colors,
      sizes,
      orientations,
    },
  });
  return data;
}
