NodeList.prototype['forEach'] = HTMLCollection.prototype['forEach'] = Array.prototype['forEach'];
var OPTIONS = {};

function save_options() {
  var status;

  OPTIONS.birdBathHideMedia = document.getElementById('birdBathHideMedia').checked;
  OPTIONS.birdBathHidePromos = document.getElementById('birdBathHidePromos').checked;
  OPTIONS.birdBathHideFollow = document.getElementById('birdBathHideFollow').checked;
  OPTIONS.birdBathHideNoText = document.getElementById('birdBathHideNoText').checked;
  OPTIONS.birdBathExpandFeed = document.getElementById('birdBathExpandFeed').checked;

  chrome.storage.sync.set({ 'options': OPTIONS });
  status = document.getElementById('status');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}

function restore_options() {
  chrome.storage.sync.get('options', function(obj) {
    if (obj.options == undefined) {
      obj.options = {
        birdBathHideMedia: false,
        birdBathHidePromos: true,
        birdBathHideFollow: true,
        birdBathHideNoText: false,
        birdBathExpandFeed: true
      };
    }
    OPTIONS = obj.options;
    document.getElementById('birdBathHideMedia').checked = obj.options.birdBathHideMedia;
    document.getElementById('birdBathHidePromos').checked = obj.options.birdBathHidePromos;
    document.getElementById('birdBathHideFollow').checked = obj.options.birdBathHideFollow;
    document.getElementById('birdBathHideNoText').checked = obj.options.birdBathHideNoText;
    document.getElementById('birdBathExpandFeed').checked = obj.options.birdBathExpandFeed;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
