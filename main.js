$(function() {
  function isPageEnabled() {
    if (location.hostname !== 'jp.finalfantasyxiv.com') {
      alert('このスクリプトは「FINAL FANTASY XIV, The Lodestone」ページにのみ対応しています。');
      return false;
    }
    if ($('#player_info').size() === 0) {
      alert('このスクリプトの実行にはログインが必要です。');
      return false;
    }
    return true;
  }

  function showModal(data) {
    require('jquery-tmpl');
    var modalHtml = require('modal.html');

    $.tmpl(modalHtml, data).appendTo('body');
    $('#myModal').modal();
  }

  function applyTable(data) {
    require('jquery-tmpl');
    require('tablesort');
    var tableHtml = require('table.html'),
        $result = $('#result');

    $result.empty();
    $.tmpl(tableHtml, data).appendTo($result);
    $result.find('table').tablesort({
      initColumn: 4,
      initDirection: 'desc'
    });
  }

  function exec() {
    if (!isPageEnabled()) { return; }

    require('bootstrap.min');
    require('bootstrap.min.css');
    require('style.css');

    var $myModal = $('#myModal');
    if ($myModal.size() !== 0) {
      $myModal.modal();
      return;
    }

    var Player = require('Player');
    var player = new Player();

    var data = { playerName: player.name, retainers: null, message: null };
    showModal(data);

    player.callRetainers().done(function(retainers) {
      data.retainers = $.map(retainers, function(retainer){
        return retainer.summarizeReport();
      });
    }).fail(function(res) {
      data.message = status !== 404 ? 'このキャラクターはリテイナーを雇っていません。' :
        ['エラーが発生しました。(', res.status, ':', res.statusText, ')'].join('');
    }).always(function() {
      applyTable(data);
    });
  }

  exec();
});
