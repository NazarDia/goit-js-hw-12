import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

export default function showMessage() {
  iziToast.show({
    close: false,
    closeOnClick: true,
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    messageColor: 'white',
    timeout: 3000,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    position: 'topRight',
    backgroundColor: 'red',
    progressBar: false,
  });
}

export let lightbox = new SimpleLightbox('#gallery a', {
  overlayOpacity: 0.5,
  showCounter: false,
});

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
let currentPage = 1;

form.addEventListener('submit', fetchImages);

loadMoreBtn.addEventListener('click', loadMoreImages);

async function fetchImages(e) {
  loader.classList.remove('hide');
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hide');
  e.preventDefault();
  currentPage = 1;

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '41488002-513c6a9a4c115eae6a99045d3',
        q: input.value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: currentPage,
      },
    });

    const images = response.data.hits;

    setTimeout(() => {
      loader.classList.add('hide');
      if (images.length === 0) {
        return showMessage();
      }
      renderImages(images);
      showLoadMoreButton();
    }, 2000);
  } catch (error) {
    console.error(error);
  }

  form.reset();
}

function renderImages(images) {
  gallery.innerHTML = images.reduce(
    (
      html,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) =>
      html +
      `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-desc">
          <div class="container-link">Likes <span class="container-item">${likes}</span></div>
          <div class="container-link">Views <span class="container-item">${views}</span></div>
          <div class="container-link">Comments <span class="container-item">${comments}</span></div>
          <div class="container-link">Downloads <span class="container-item">${downloads}</span></div>
        </div>
      </li>
      `,
    ''
  );
  lightbox.refresh();
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hide');
}

async function loadMoreImages() {
  loader.classList.remove('hide');
  loadMoreBtn.classList.add('hide');
  currentPage++;

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '41488002-513c6a9a4c115eae6a99045d3',
        q: input.value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: currentPage,
      },
    });

    const images = response.data.hits;

    setTimeout(() => {
      loader.classList.add('hide');
      if (images.length === 0) {
        return showMessage();
      }
      renderImages(images);
      showLoadMoreButton();
    }, 2000);
  } catch (error) {
    console.error(error);
  }
}
