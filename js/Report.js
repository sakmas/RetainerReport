module.exports = (function() {
  return function($record) {
    this.name = $record.find('.retainer_item_txt').html();
    var _info = $record.children('td');
    this.salePrice = _info.eq(0).text().trim();
    this.buyer = _info.eq(1).text().trim();
    this.saleDate = eval(_info.eq(2).children('script').text().split(' = ')[1]);
  };
})();
