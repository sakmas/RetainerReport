module.exports = (function() {
  var value = 0,
      step = 0,
      barTarget = null,
      messageTarget = null;

  function setProgress(value) {
    barTarget.width(value + '%');
  }

  function setMessage(name) {
    messageTarget.text(name);
  }

  return {
    setup: function(count) {
      barTarget = $('#progress-bar');
      messageTarget = $('#progress-message');
      step = Math.floor(100 / count);
    },
    advance: function(name) {
      setProgress(value += step);
      setMessage(name + ' を呼び出しました...');
    },
    finish: function() {
      setProgress(100);
      setMessage('処理しています...');
    }
  };
})();
