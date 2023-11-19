/* global data */
const $input = document.querySelector('.photo-URL');
const $image = document.querySelector('img');
const $entriesUnorderedList = document.querySelector('#entries-Unordered-List');

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

  const $entry = renderEntry(newData);
  $entriesUnorderedList.prepend($entry);
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  const newLi = document.createElement('li');
  const div1 = document.createElement('div');
  div1.className = 'row';
  newLi.appendChild(div1);

  const div2 = document.createElement('div');
  div2.className = 'column-half';
  div1.appendChild(div2);
  const img1 = document.createElement('img');
  img1.className = 'picture';
  img1.setAttribute('src', entry.imageUrl);
  div2.appendChild(img1);

  const div3 = document.createElement('div');
  div3.className = 'column-half';
  div1.appendChild(div3);
  const div4 = document.createElement('div');
  div4.className = 'info';
  div3.appendChild(div4);

  const newHeading1 = document.createElement('h2');
  newHeading1.textContent = entry.title;
  const newContext1 = document.createElement('p');
  newContext1.textContent = entry.notes;
  div4.appendChild(newHeading1);
  div4.appendChild(newContext1);

  return newLi;
}

document.addEventListener('DOMContentLoaded', function (event) {
  console.log(data.entries);
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i]) {
      const $entry = renderEntry(data.entries[i]);
      $entriesUnorderedList.prepend($entry);
    }
  }
});

function toggleNoEntries() {
  const $paragraph = document.querySelector('#noEntriesText');
  console.log($paragraph);
  if (data.entries.length) {
    $paragraph.classList.add('hidden');
  } else {
    $paragraph.classList.remove('hidden');
  }
}

function viewSwap(viewName) {
  const $dataView = document.querySelectorAll('[data-view]');
  for (let i = 0; i < $dataView.length; i++) {
    const view = $dataView[i];
    if (view.dataset.view === viewName) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  }
  data.view = viewName;
}
