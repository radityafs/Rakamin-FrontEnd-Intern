import axios from 'axios';

const getProduct = (page = 1, search = '') => {
  return axios
    .get(
      `https://62ea5af23a5f1572e879a2f7.mockapi.io/data/products/?page=${page}&limit=6&search=${search}`
    )
    .then((response) => response.data);
};

const getProductDetail = (id) => {
  return axios
    .get(`https://62ea5af23a5f1572e879a2f7.mockapi.io/data/products/${id}`)
    .then((response) => response.data);
};

export { getProduct, getProductDetail };
