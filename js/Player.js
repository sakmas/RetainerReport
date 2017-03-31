module.exports = (function() {
  function _getRetainerIdList(retainerPage) {
    return $(retainerPage).find('.retainer--select').find('option').filter(function(_, option) {
      return $(option).val() !== '';
    }).map(function(_, option) {
      return $(option).val().split('/')[5];
    }).get();
  }

  function _eachWithInterval(array, callback, interval) {
    var d = $.Deferred(),
        delay = 0,
        length = array.length;

    if (length === 0) { d.resolve(); }

    $.each(array, function(index, value) {
      setTimeout(function() {
        callback(value);
        if (index + 1 >= length) {
          d.resolve();
        }
      }, delay);
      delay += interval;
    });
    return d.promise();
  }

  function _callRetainers() {
    var Retainer = require('Retainer'),
        d = $.Deferred(),
        player = this,
        progress = require('ProgressBar');

    $.get(this.retainerUri).done(function(retainerPage) {
      var retainerIdList = _getRetainerIdList(retainerPage),
          retainreList = [],
          retainerPromiseList = [];

      progress.setup(retainerIdList.length);

      // send request at intervals of 1000ms
      _eachWithInterval(retainerIdList, function(id) {
        var retainer = new Retainer(id, player.retainerUri);
        retainreList.push(retainer);
        var filterd = retainer._promise.pipe(function(_retainer) {
          progress.advance(_retainer.name);
        });
        retainerPromiseList.push(filterd);
        console.log(retainer);
      }, 1000).done(function() {
        $.when.apply(player, retainerPromiseList).done(function() {
          progress.finish();
          d.resolve(retainreList);
        });
      });
    }).fail(function(res) {
      d.reject(res);
    });
    return d.promise();
  }

  return function() {
    var _info = $('.head-my-character__name');
    this.name = _info.text().trim();
    this.id = $('.my-menu__colmun').find('[href^="/lodestone/character/"]').attr('href').split('/')[3]
    this.retainerUri = ['/lodestone/character/', this.id, '/retainer/'].join('');
    this.callRetainers = _callRetainers;
  };
})();
