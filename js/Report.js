module.exports = (function() {
  return function($record) {
    this.name = $record.find('.item-list__name').html();
    var _info = $record.children('div');
    this.salePrice = _info.eq(1).text().trim();
    this.buyer = _info.eq(2).text().trim();
    this.saleDate = eval(_info.eq(3).children('script').text().split(' = ')[1]);
  };
})();
