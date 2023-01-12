import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30659644-d62c8c976bf0a1f367dc53c1a';

export const fetchImages = async (querry, page) => {
  const response = await axios.get(
    `?q=${querry}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );

  return response.data;
};
