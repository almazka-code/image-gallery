const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const gallery = document.querySelector('.gallery');
let searchValue = 'cat';

window.addEventListener('load', apiRequest);

searchInput.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    removeImages();
    apiRequest();
  }  
});

searchButton.addEventListener('click', () => {
  removeImages();
  apiRequest();
});

function removeImages() {
  document.querySelectorAll('.gallery__image').forEach((el) => {
    el.remove();
  })
}

function getURL(search = 'cat') {
  return `https://api.unsplash.com/search/photos?query=${search}&per_page=12&orientation=landscape&client_id=OGdX3wroDUy9hAv7K-hesXcIPmZqajFvPSuZFAFTlrw`;
}

async function apiRequest() {
  try {    
    if (searchInput.value.length > 0) {
      searchValue = searchInput.value;
    }
    const response = await fetch(getURL(searchValue));    
    const data = await response.json(); 
    renderImages(data);

    const imageItem = document.querySelectorAll('.gallery__image');
    imageItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(data, index);
        })
    })

  } catch (error) {
    console.log(error);
  }
}

function renderImages(data) {
  for (let i = 0; i < data.results.length; i++) {   
    let image = document.createElement('li');
    image.className = "gallery__image";
    image.style.backgroundImage = `url("${data.results[i].urls.regular}")`;
    gallery.appendChild(image);
  }  
}

// открытие модального окна с картинкой
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');

function openModal(data, index) {
    modal.classList.add('modal--active');
    modalContainer.style.backgroundImage = `url(${data.results[index].urls.regular})`;
};

function closeModal() {
    modal.classList.remove('modal--active');
};

window.addEventListener('click', (evt) => {
    if (!modalContainer.contains(evt.target) && modal.contains(evt.target)) {
        closeModal()
    }
});

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeModal();
    }
});