module.exports = (function() {
  function _createReport($data) {
    var Report = require('Report');
    return $data.find('.table_retainer_item').last().find('tbody > tr').map(function(_, record) {
      return new Report($(record));
    });
  }

  function _summarizeReport() {
    var my = this;
    return $.map(my.saleReports, function(report) {
      return {
        name: my.name,
        item: report.name,
        price: report.salePrice,
        buyer: report.buyer,
        saleDate: report.saleDate
      };
    });
  }

  return function(id, retainerUri) {
    var d = $.Deferred();
    this._promise = d.promise();
    this.summarizeReport = _summarizeReport;
    $.ajax({
      url: [retainerUri, id].join(''),
      context: this
    }).then(function(data) {
      this.name = $(data).find('.retainer--name').children('p').text().trim();
      this.level = $(data).find('#retainer--class_info > .level').text().split(' ')[1];
      this.saleReports = _createReport($(data));
      this.lastUpdate = eval($(data).find('.ymd script').text().split(' = ')[1]);
      d.resolve(this);
    });
  };
})();
