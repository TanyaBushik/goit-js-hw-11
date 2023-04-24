import fetchImages from './js/fetch-images';
import createMarkup from './js/card-markup.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
let simpleLightBox;

form.addEventListener('submit', onSubmitSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitSearch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    currentPage = 1;
    gallery.innerHTML = '';
      loadMoreBtn.classList.add('is-hidden');
      

    if (searchQuery === '') {
        Notify.failure(
          'The search string cannot be empty. Please specify your search query.'
        );
        return;
    }

    fetchImages(searchQuery, currentPage)
      .then(({ data }) => {
        if (data.totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
    
        } else {
            createMarkup(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
          Notify.success(`Hooray! We found ${data.totalHits} images.`);

          if (data.totalHits > 40) {
            loadMoreBtn.classList.remove('is-hidden');
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        form.reset();
      });
}

function onLoadMore() {
    currentPage += 1;
    simpleLightBox.destroy();
    
    fetchImages(searchQuery, currentPage)
      .then(({ data }) => {
        createMarkup(data.hits);
         simpleLightBox = new SimpleLightbox('.gallery a').refresh();

        const totalPages = Math.ceil(data.totalHits / 40);

        if (currentPage > totalPages) {
          loadMoreBtn.classList.add('is-hidden');
         Notify.failure(
           "We're sorry, but you've reached the end of search results."
         );
        }
      })
      .catch(error => console.log(error));
}






