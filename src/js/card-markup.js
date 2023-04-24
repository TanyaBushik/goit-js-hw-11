
const gallery = document.querySelector('.gallery');

export default function createMarkup(queriesArray) {
  const markup = queriesArray
    .map(item => {
      return `<a class="gallery__link" href="${item.largeImageURL}">
   <div class="gallery-item" id="${item.id}">
  <img class="gallery-item__img" src="${item.webformatURL}"
  alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${item.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${item.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${item.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${item.downloads}</span>
    </p>
  </div>
</div>
  </a>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

