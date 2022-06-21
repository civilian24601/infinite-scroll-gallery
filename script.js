const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;


// Unsplash API
const count = 5;
const apiKey = 'kg3zJ_w8WiOmD7aBacg05fV_ovV2WHjbGJbgHP3D6mw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
const imageLoaded = () => {
    console.log('image loaded');
    imagesLoaded++; // Increase imagesLoaded by 1
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
    }
}

// Helper Function to set attributes of DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links and Photos, Add to DOM
const displayPhotos = () => {
    totalImages = photosArray.length;
    // Run function for each object in array
    photosArray.forEach((photo) => {
        // Create <a> element to link to Unsplash
        const item = document.createElement('a');
        
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> element to display photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            title: photo.description,
        });
        

        //  Event Listener, check if image is loaded
        img.addEventListener('load', imageLoaded);

// Put <img> inside <a>, then put <a> inside imageContainer

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

const getPhotos = async () => {
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    } catch (error) {
        // Catch error
        console.log(error);
    }
}

// Check to see if scrolling near the bottom of the page, if so, get more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
    }
})

// On Load
getPhotos();