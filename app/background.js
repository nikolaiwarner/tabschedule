var check_time, tabschedule;

tabschedule = new TabSchedule();

check_time = function() {
  return tabschedule.load_tabs(function() {
    var date, schedule, tab, _i, _len, _ref, _results;
    date = moment().format('L');
    _ref = tabschedule.tabs;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tab = _ref[_i];
      if (tab.schedules) {
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = tab.schedules;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            schedule = _ref1[_j];
            if (schedule.day === moment().format('dddd')) {
              if (!tabschedule.opened_today(schedule)) {
                if (moment().isAfter(moment(date + " " + schedule.time))) {
                  tabschedule.mark_as_opened(tab.id, schedule);
                  _results1.push(tabschedule.open_url(tab.url, function() {
                    return console.log('opened', tab.url);
                  }));
                } else {
                  _results1.push(void 0);
                }
              } else {
                _results1.push(void 0);
              }
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
};

$(function() {
  return setInterval(check_time, 1000 * 60 * 5);
});
