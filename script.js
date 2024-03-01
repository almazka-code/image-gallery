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
  return `https://api.unsplash.com/search/photos?query=${search}&per_page=9&orientation=landscape&client_id=OGdX3wroDUy9hAv7K-hesXcIPmZqajFvPSuZFAFTlrw`;
}

async function apiRequest() {
  try {    
    if (searchInput.value.length > 0) {
      searchValue = searchInput.value;
    }
    const response = await fetch(getURL(searchValue));    
    const data = await response.json(); 
    loadImages(data);
  } catch (error) {
    console.log(error);
  }
}

function loadImages(data) {
  for (let i = 0; i < data.results.length; i++) {   
    let image = document.createElement('li');
    image.className = "gallery__image";
    image.style.backgroundImage = `url("${data.results[i].urls.raw}")`;
    gallery.appendChild(image);
  }  
}