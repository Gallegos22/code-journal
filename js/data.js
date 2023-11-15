/* exported data */ /* global data */

const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('dataModel', jsonData);

  const previousjsonData = localStorage.getItem('dataModel');

  if (previousjsonData === jsonData) {
    JSON.parse(data.entries);
  }
});
