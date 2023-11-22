/* global data */
const $input = document.querySelector('.photo-URL');
const $image = document.querySelector('img');
const $entriesUnorderedList = document.querySelector('#entries-Unordered-List');

$input.addEventListener('input', function (event) {
  $image.src = $input.value;
});

const $submit = document.querySelector('form');
const $title = document.querySelector('#title-box');

$entriesUnorderedList.addEventListener('click', function (event) {
  // console.log(event.target)
  const entryId = event.target.dataset.entryid;
  // console.log(entryId);
  viewSwap('entry-form');
  const editedObject = data.entries.find((entry) => entry.entryId === entryId);
  if (!editedObject) {
    return;
  }
  // console.log(editedObject);
  data.editing = editedObject;
  const $myForm = document.querySelector('#myForm');
  $myForm['title-box'].value = editedObject.title;
  $myForm.photoUrl.value = editedObject.imageUrl;
  $myForm.notes.value = editedObject.notes;
  document.querySelector('#placeholder-img').src = editedObject.imageUrl;
  document.querySelector('#entry-form-title').textContent = 'Edit Entry';
});

$submit.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing) {
    const editedObject = data.entries.find(
      (entry) => entry.entryId === data.editing.entryId
    );
    // console.log(editedObject);
    if (editedObject) {
      editedObject.title = $title.value;
    }
    if (editedObject) {
      editedObject.notes = document.getElementById('notes').value;
    }
    if (editedObject) {
      editedObject.imageUrl = $image.src;
    }
    $entriesUnorderedList.innerHTML = '';
    for (const entry of data.entries) {
      const $entry = renderEntry(entry);
      $entriesUnorderedList.prepend($entry);
    }
  } else {
    event.preventDefault();
    data.nextEntryId++;
    const newData = {
      title: $title.value,
      notes: document.getElementById('notes').value,
      imageUrl: $image.src,
      entryId: data.nextEntryId,
    };
    data.entries.unshift(newData);

    const image = document.getElementById('placeholder-img');
    image.src = '/images/placeholder-image-square.jpg';

    const form = document.getElementById('myForm');
    form.reset();
    const $entry = renderEntry(newData);
    $entriesUnorderedList.prepend($entry);
  }
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  const newLi = document.createElement('li');
  newLi.setAttribute('data-entryId', entry.entryId);
  console.log(entry);
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
  const pencilIcon = document.createElement('i');
  pencilIcon.className = 'fa-solid fa-pencil';
  pencilIcon.setAttribute('data-entryId', entry.entryId);
  newHeading1.appendChild(pencilIcon);
  const newContext1 = document.createElement('p');
  newContext1.textContent = entry.notes;
  div4.appendChild(newHeading1);
  div4.appendChild(newContext1);

  return newLi;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const restoreData = JSON.parse(window.localStorage.getItem('dataModel'));
  console.log(restoreData);
  data.entries = restoreData.entries;
  data.view = restoreData.view;
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i]) {
      const $entry = renderEntry(data.entries[i]);
      $entriesUnorderedList.prepend($entry);
    }
  }

  const max = data.entries.reduce((acc, current) => {
    return acc && acc.entryId > current.entryId ? acc : current;
  }, {});

  data.nextEntryId = max.entryId ? max.entryId : 1;

  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  const $paragraph = document.querySelector('#noEntriesText');
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
