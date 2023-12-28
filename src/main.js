import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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

form.addEventListener('submit', fetchImages);

function fetchImages(e) {
  loader.classList.remove('hide');
  gallery.innerHTML = '';
  e.preventDefault();
  const searchParams = new URLSearchParams({
    key: '41488002-513c6a9a4c115eae6a99045d3',
    q: input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(images => {
      setTimeout(() => {
        loader.classList.add('hide');
        if (images.hits.length === 0) {
          return showMessage();
        }
        renderImages(images.hits);
      }, 2000);
    })
    .catch(error => console.log(error));

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
