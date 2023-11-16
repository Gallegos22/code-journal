/* global data */
const $input = document.querySelector('.photo-URL');
const $image = document.querySelector('img');

$input.addEventListener('input', function (event) {
  $image.src = $input.value;
});

const $submit = document.querySelector('form');
const $title = document.querySelector('#title-box');

$submit.addEventListener('submit', function (event) {
  event.preventDefault();
  const newData = {
    title: $title.value,
    notes: document.getElementById('notes').value,
    imageUrl: $image.src,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(newData);

  const image = document.getElementById('placeholder-img');
  image.src = '/images/placeholder-image-square.jpg';

  const form = document.getElementById('myForm');
  form.reset();
});
