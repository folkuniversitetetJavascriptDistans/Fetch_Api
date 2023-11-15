const API_KEY = "din_egna_API_KEY";
const BASE_URL = "https://api.unsplash.com";

const imagesElem = document.querySelector("#images");

function createImageItem(image) {
  const imageElem = document.createElement("img");
  imageElem.setAttribute("src", image.urls.thumb);
  imageElem.setAttribute("alt", image.alt_description);
  imagesElem.append(imageElem);
}

function displayImages(images) {
  for (const image of images) {
    console.log("kattData", image);
    createImageItem(image);
  }
}

async function getPhotos() {
  //client_id är vår API-nyckel
  const response = await fetch(
    `${BASE_URL}/search/photos?client_id=${API_KEY}&query=dog`
  );
  const data = await response.json();
  console.log(data);

  displayImages(data.results);
}

getPhotos();
