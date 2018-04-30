module.exports = (function() {
  function buildDate(match, p1) {
    var d = new Date();
    var date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).substr(-2),
      ('0' + d.getDate()).substr(-2)
    ].join('/');
    return [date, ' ', ('0'+p1).substr(-2), ':'].join('');
  }

  return function($record) {
    this.name = $record.find('.item-list__name').html();
    var _info = $record.children('div');
    this.salePrice = _info.eq(1).text().trim();
    this.buyer = _info.eq(2).text().trim();
    var _saleDate = eval(_info.eq(3).children('script').text().split(' = ')[1]);
    this.saleDate = _saleDate.replace(/本日 (\d+):/, buildDate);
  };
})();
