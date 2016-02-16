NodeList.prototype['forEach'] = HTMLCollection.prototype['forEach'] = Array.prototype['forEach'];
var OPTIONS = {};

function save_options() {
  var status;

  OPTIONS.birdBathHideMedia = document.getElementById('birdBathHideMedia').checked;
  OPTIONS.birdBathHidePromos = document.getElementById('birdBathHidePromos').checked;
  OPTIONS.birdBathHideWhoToFollow = document.getElementById('birdBathHideWhoToFollow').checked;
  OPTIONS.birdBathHideRecentFollow = document.getElementById('birdBathHideRecentFollow').checked;
  OPTIONS.birdBathHideNoText = document.getElementById('birdBathHideNoText').checked;
  OPTIONS.birdBathHideProfileBanners = document.getElementById('birdBathHideProfileBanners').checked;
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
        birdBathHideWhoToFollow: true,
        birdBathHideRecentFollow: true,
        birdBathHideNoText: false,
        birdBathHideProfileBanners: false,
        birdBathExpandFeed: true
      };
    }
    OPTIONS = obj.options;
    document.getElementById('birdBathHideMedia').checked = obj.options.birdBathHideMedia;
    document.getElementById('birdBathHidePromos').checked = obj.options.birdBathHidePromos;
    document.getElementById('birdBathHideWhoToFollow').checked = obj.options.birdBathHideWhoToFollow;
    document.getElementById('birdBathHideRecentFollow').checked = obj.options.birdBathHideRecentFollow;
    document.getElementById('birdBathHideNoText').checked = obj.options.birdBathHideNoText;
    document.getElementById('birdBathHideProfileBanners').checked = obj.options.birdBathHideProfileBanners;
    document.getElementById('birdBathExpandFeed').checked = obj.options.birdBathExpandFeed;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
