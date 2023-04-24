import axios from 'axios';

// export default async function fetchImages(value, page) {
//   const url = 'https://pixabay.com/api/';
//   const key = '35569629-68d598aa8a27ce1f99985e42c';
//   const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
// const response = await axios.get(`${url}${filter}`),
//     return response;
// }

export default async function fetchImages(value, page) {
    const url = 'https://pixabay.com/api/';
  const key = '35569629-68d598aa8a27ce1f99985e42c';
  const response = await axios.get(
    `${url}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return response;
}
