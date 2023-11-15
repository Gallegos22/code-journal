/* global data */
const $input = document.querySelector('.photo-URL');
const $image = document.querySelector('img');

console.log($input);
console.log($image);

$input.addEventListener('input', function (event) {
  $image.src = $input.value;
});

const $submit = document.querySelector('form');
console.log($submit);
const $title = document.querySelector('#title-box');
console.log($title);

$submit.addEventListener('submit', function (event) {
  event.preventDefault();
  const newData = {
    title: $title.value,
    notes: document.getElementById('notes').value,
    imageUrl: $image.src,
    entryId: data.nextEntryId,
  };
  console.log(newData);
  data.nextEntryId++;
  data.entries.push(newData);

  const image = document.getElementById('placeholder-img');
  image.src = '/images/placeholder-image-square.jpg';

  const form = document.getElementById('myForm');
  form.reset();
});
