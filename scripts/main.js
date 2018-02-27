var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
var currentSlide = 0;
var next = document.getElementById('next');
var previous = document.getElementById('prev');

function setDetails(imageUrl, titleText, id) {
  'use strict';
  detailImage.setAttribute('src', imageUrl);
  detailImage.setAttribute('id', id);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function getIdFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('id');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), getIdFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

function nextSlide() {
  var a = (detailImage.getAttribute('id'));
  currentSlide = Number(a);
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  var a = (detailImage.getAttribute('id'));
  currentSlide = Number(a);
  goToSlide(currentSlide - 1);
}

function goToSlide(n) {
  var thumbs = getThumbnailsArray();
  currentSlide = (n + thumbs.length) % thumbs.length;
  setDetailsFromThumb(thumbs[currentSlide]);
}

next.onclick = function() {
  nextSlide();
};

previous.onclick = function() {
  previousSlide();
};

initializeEvents();
