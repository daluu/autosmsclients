// welcome page for Chrome
(function () {
  var storage = {
    read: function (id) {
      return localStorage[id] || null;
    },
     write: function (id, data) {
      localStorage[id] = data + '';
    }
  };
  function version () {
    return chrome[chrome.runtime && chrome.runtime.getManifest ? 'runtime' : 'extension'].getManifest().version;
  }
  function open (url) {
    chrome.tabs.create({
      url: url,
    });
  }

  if (version() !== storage.read('version')) {
    window.setTimeout(function () {
      open('http://add0n.com/autosms.html?v=' + version() + (storage.read('version') ? '&p=' + storage.read('version') + '&type=upgrade' : '&type=install'));
      storage.write('version', version());
    }, 3000);
  }
})();